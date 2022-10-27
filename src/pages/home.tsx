import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { detect, detectState, getdetection, getjango, registerDetection } from "../controller/getmodel";
import Detection from "../constants/detection";
import moment from 'moment';

const Home = () => {
    let navigate = useNavigate();
    const [didSelect, setDidSelect] = useState<boolean>(false)
    const [showDetect, setShowDetect] = useState<boolean>(false)
    const [showYolo, setShowYolo] = useState<boolean>(false)
    const [showState, setShowState] = useState<boolean>(false)
    const [showTypes, setShowTypes] = useState<boolean>(false)
    const [showTypeRegistered, setShowTypeRegistered] = useState<boolean>(false)
    const [productType, setProducType] = useState<string>('')
    const [productTypeJson, setProducTypeJson] = useState<string>('')
    const [stateProduct, setStateProduct] = useState<String>('')
    const [didSelectRegistered, setDidSelectRegistered] = useState<boolean>(false)
    const [typeText, setTypeText] = useState<string>('')
    const [count, setCount] = useState<any>()
    const [average, setAverage] = useState<any>()
    const [averageState, setAverageState] = useState<any>()
    const [state, setState] = useState<any>()
    const [namesGood, setNamesGood] = useState<any>()
    const [namesBad, setNamesBad] = useState<any>()
    const [fullcount, setFullcount] = useState<number>(0)
    const [fullcountdamage, setFullcountdamage] = useState<number>(0)
    const [object, setObject] = useState<any[]>([])
    const [dimage, setDimage] = useState<any>()
    const [showGoodState, setShowGoodState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    const [uploadedImage, setUploadedImage] = useState<File>()

    const [searchParams, setSearchParams] = useSearchParams();
    const [imageYolo, setImageYolo] = useState<string>('')
    const [imageState, setImageState] = useState<string>('')
    const [eproduct, setEproduct] = useState<string>('')

    const [imagesYoloCroppedGood, setImagesYoloCroppedGood] = useState<any[]>([])
    const [imagesYoloCroppedBad, setImagesYoloCroppedBad] = useState<any>()

    const [date, setDate] = useState<any>(new Date().toISOString().split('T')[0]);
    const [user, setUser] = useState<string>('')
    const [id, setId] = useState<any>()

    const [avgF, setAvgF] = useState(0)

    useEffect(() => {

        if (!localStorage.getItem('id')) {
            navigate('/')
        }

        setUser(localStorage.getItem('email')!)
        setId(localStorage.getItem('id')!)
        console.log(localStorage.getItem('email')!, localStorage.getItem('id')!)

        setImagesYoloCroppedBad([])
        setImagesYoloCroppedGood([])

        let photoGood = searchParams.get('imagesGood')
        let photoBad = searchParams.get('imagesBad')
        let count = searchParams.get('count')
        let average = searchParams.get('average')
        let namesGood = searchParams.get('namesGood')
        let namesBad = searchParams.get('namesBad')
        setShowTypeRegistered(false)


        if (photoGood && count && average && (namesGood || namesBad)) {
            //photoGood = `[${photoGood}]`
            console.log(namesGood)

            photoGood = photoGood!.replace(/'/g, '"')
            photoGood = '[' + photoGood + ']'
            photoGood = JSON.parse(photoGood)

            namesGood = namesGood!.replace(/'/g, '"')
            namesGood = '[' + namesGood + ']'
            namesGood = JSON.parse(namesGood)

            photoBad = photoBad!.replace(/'/g, '"')
            photoBad = '[' + photoBad + ']'
            photoBad = JSON.parse(photoBad)

            namesBad = namesBad!.replace(/'/g, '"')
            namesBad = '[' + namesBad + ']'
            namesBad = JSON.parse(namesBad)

            console.log(photoGood)
            // console.log(photoGood)
            //console.log(photoGood![0])
            if (photoGood!.length > 1) {
                let temp = []
                for (let x = 1; x < photoGood!.length; x++) {
                    temp.push(photoGood![x])
                }
                setImagesYoloCroppedGood(temp)
            }
            if (photoBad!.length > 0) {
                setImagesYoloCroppedBad(photoBad)
            }

            setDidSelect(true)
            $('.return').addClass('active')
            setShowDetect(true)
            setShowYolo(true)
            setImageYolo(photoGood![0])
            setNamesGood(namesGood)
            setNamesBad(namesBad)
            setCount(count)
            setAverage(average)
            // setImageYolo(photo)
        }
        removeQueryParams()
    }, [])

    /*useEffect(()=>{
        console.log(imagesYoloCropped)

        if(imagesYoloCropped){
            let temp = imagesYoloCropped
            setImagesYoloCropped(temp)
        }
    },[imagesYoloCropped])*/

    const removeQueryParams = () => {
        const param = searchParams.get('imagesGood');
        const param2 = searchParams.get('imagesBad')
        if (param || param2) {
            searchParams.delete('imagesGood');
            searchParams.delete('imagesBad');
            searchParams.delete('average')
            searchParams.delete('count');
            searchParams.delete('namesGood');
            searchParams.delete('namesBad');
            setSearchParams(searchParams);
        }
    };

    useEffect(() => {
        $('.cu-left').addClass('active')
        setShowGoodState(true)
    }, [namesGood, namesBad])

    function showTypeHtml() {
        setShowDetect(false)
        setShowYolo(false)
        setShowState(false)
        setShowTypeRegistered(false)
        if (!showTypes) {
            setShowTypes(true)
            setDidSelect(true)
            $('.return').addClass('active')
        }
        else {
            setDidSelect(false)
            setShowTypes(false)
            $('.return').removeClass('active')
        }
    }

    const option: any = {
        mediaType: 'photo'
    }

    useEffect(() => {
        $('.uil-bars').removeClass('active')
        $('.navbar-redirect').removeClass('active')
        $('.link-item').removeClass('active')
        $('.show-info-mobile').removeClass('active')
        $('.arrow-cont').removeClass('active')
        $('.uil-arrow-to-right').removeClass('active')
        $('.menu-tablet').removeClass('active')
        $('.product-image-full').removeClass('active')
        $('.uil-times').removeClass('active')
        $('.overlay').removeClass('active')
        $(".colection-info-yolo").removeClass('active')
        $('.image-full').removeClass('active')
    }, [])
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }, [])
    useEffect(() => {
        $('.arrow-cont').on('click', function () {
            if ($(this).hasClass('active')) {
                $('.menu-tablet').removeClass('active')
                $(this).removeClass('active')
                $('.uil-arrow-to-right').removeClass('active')
            }
            else {
                $('.menu-tablet').addClass('active')
                $(this).addClass('active')
                $('.uil-arrow-to-right').addClass('active')
            }
        })
        $('.uil-bars').on('click', function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
                $('.navbar-redirect').removeClass('active')
                $('.link-item').removeClass('active')
                $('.show-info-mobile').removeClass('active')
            }
            else {
                $(this).addClass('active')
                $('.navbar-redirect').addClass('active')
                $('.link-item').addClass('active')
                $('.show-info-mobile').addClass('active')
            }
        })
        $('.link-item').on('click', function () {
            if ($('.uil-bars').hasClass('active')) {
                $('.uil-bars').removeClass('active')
                $('.navbar-redirect').removeClass('active')
                $('.link-item').removeClass('active')
                $('.show-info-mobile').removeClass('active')
            }
        })
        $('.whatsapp').on('click', function () {
            if ($('.whatsapp-active').hasClass('active')) {
                $('.whatsapp-active').removeClass('active')
            }
            else {
                $('.whatsapp-active').addClass('active')
            }
        })
    }, [])


    useEffect(() => {
        $('.product-image').on('click', function () {
            $('.product-image-full').addClass('active')
            $('.uil-times').addClass('active')
            $('.overlay').addClass('active')
            $(".colection-info-yolo").addClass('active')
            $('.image-full').addClass('active')
        })
        $('.uil-times').on('click', function () {
            $('.product-image-full').removeClass('active')
            $('.uil-times').removeClass('active')
            $('.overlay').removeClass('active')
            $(".colection-info-yolo").removeClass('active')
            $('.image-full').removeClass('active')
        })
    })

    function toggleState(e: any) {
        if (e.target.classList.contains('cu-left')) {
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active')
                $('.cu-right').addClass('active')
                setShowGoodState(false)
            }
            else {
                e.target.classList.add('active')
                $('.cu-right').removeClass('active')
                setShowGoodState(true)
            }
        }
        if (e.target.classList.contains('cu-right')) {
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active')
                $('.cu-left').addClass('active')
                setShowGoodState(true)
            }
            else {
                e.target.classList.add('active')
                $('.cu-left').removeClass('active')
                setShowGoodState(false)
            }
        }
    }

    function goPhoto() {
        navigate("/camera");
    }

    function setProduct(e: any) {
        $('.button-tablet').removeClass('active')
        const temp = e.target.classList.contains('active')
        const cropped = document.querySelectorAll('.cropped-size')
        cropped.forEach(p => {
            p.classList.remove('active')
        });

        if (!temp) {
            e.target.classList.add('active')
            setImageState(e.target.src)
            setTypeText(e.target.parentNode.children[1].textContent)
        }
        else {
            e.target.classList.remove('active')
            setImageState('')
            setTypeText('')
        }
    }

    async function verifyState() {
        if (imageState == '') {
            $('.button-tablet').addClass('active')
            return
        }

        let res = await detectState(imageState)
        console.log(res)
        setAverageState(res.average)
        setState(res.state)

        setShowYolo(false)
        setShowState(true)
    }

    async function convertBase64(file: any) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    async function detectUploaded(e: any) {
        let file = e.target.files[0]
        setImagesYoloCroppedBad([])
        setImagesYoloCroppedGood([])
        setCount(0)
        
        $('.cu-left').addClass('active')
        $('.cu-right').removeClass('active')
        setShowGoodState(true)



        console.log("aqui")
        const base64 = await convertBase64(file)

        let res = await detect(base64)

        let photoGood = res.resultGood
        let photoBad = res.resultBad
        let count = res.count
        let average = res.average
        let namesGood = res.namesGood
        let namesBad = res.namesBad

        console.log(res.imagearr)

        if (photoGood!.length > 1) {
            let temp = []
            for (let x = 1; x < photoGood!.length; x++) {
                temp.push(photoGood![x])
            }
            setImagesYoloCroppedGood(temp)
        }
        if (photoBad!.length > 0) {
            setImagesYoloCroppedBad(photoBad)
        }


        setImageYolo(photoGood![0])
        console.log(namesGood, namesBad)

        setNamesGood(namesGood)
        setNamesBad(namesBad)

        setCount(count)
        setAverage(average)

        setShowTypes(false)
        setShowTypeRegistered(false)
        setDidSelect(true)
        $('.return').addClass('active')
        setShowDetect(true)
        setShowYolo(true)
        e.target.value = ''
    }

    function goBack() {
        console.log(showYolo, showState)
        $('.message-load').removeClass('active')
        if (showState) {
            setShowState(false)
            setShowYolo(true)
            return
        }
        if (showYolo) {
            setShowDetect(false)
            setShowYolo(false)
            setDidSelect(false)
            $('.return').removeClass('active')
            return
        }
        if (showTypes) {
            setShowTypes(false)
            setDidSelect(false)
            $('.return').removeClass('active')
            return
        }
        if (showTypeRegistered) {
            setShowTypeRegistered(false)
            setShowTypes(true)
            return
        }
    }

    async function registrarProducto() {
        if (imagesYoloCroppedBad.length > 0 || imagesYoloCroppedGood.length > 0) {
            setLoading(true)
            const totalImages = imagesYoloCroppedGood.concat(imagesYoloCroppedBad)
            const totalLabel = namesGood.concat(namesBad)

            console.log(totalLabel)

            for (let x = 0; x < totalImages.length; x++) {
                let nametype = ''
                if (totalLabel[x].split('ME_')[0] == '') {
                    nametype = totalLabel[x].split('ME_')[1]
                }
                else {
                    nametype = totalLabel[x]
                }

                const detection: Detection = {
                    user_id: id, count: count.toString(), percentage: average.toString(), date: new Date(),
                    names: totalLabel[x], nametype: nametype, images: totalImages[x]
                }

                let res = await registerDetection(detection)
                console.log(res.ok)
            }
            $('.message-load').addClass('active')
            setTimeout(() => {
                goBack()
                setLoading(false)
            }, 2000);
        }
        else {
            return alert("No hay detecciones")
        }
    }

    function getTypeRegistered(type: string) {
        setFullcount(0)
        setFullcountdamage(0)
        setObject([])
        setAvgF(0)
        setDimage('')
        setStateProduct('')
        setEproduct('')

        setShowTypes(false)
        setShowTypeRegistered(true)
        if (type == 'sanmateo') {
            setProducType('San Mateo')
            setProducTypeJson('SanMateo_2.5L')
        }
        if (type == 'inca') {
            setProducType('Inca Kola')
            setProducTypeJson('IncaKola_1.5L')
        }
        if (type == 'cielo') {
            setProducType('Cielo')
            setProducTypeJson('Cielo_2.5L')
        }
        if (type == 'monster') {
            setProducType('Monster Original')
            setProducTypeJson('MonsterOriginal_473ml')
        }
        if (type == 'redbull') {
            setProducType('Redbull')
            setProducTypeJson('RedBull_250ml')
        }
        if (type == 'monster_sa') {
            setProducType('Monster sin Azucar')
            setProducTypeJson('MonsterZeroSugar_473ml')
        }

    }

    function selectRegistered(e: any, element: any) {
        let name = e.target.parentNode.children[0].textContent
        setStateProduct(name)

        if (element['names'].split('ME_')[0] == '') {
            setEproduct('En mal estado')
        }
        else {
            setEproduct('En buen estado')
        }

        let image = element['images']

        setDimage(image)
        setDidSelectRegistered(true)
    }

    async function testing() {
        let a = await getjango();
        console.log(a)
    }

    async function onChangeDate(e: any) {
        setObject([])
        setFullcount(0)
        setAvgF(0)
        setFullcountdamage(0)

        console.log(e.target.value)
        const newDate = new Date(e.target.value).toISOString().split('T')[0]
        setDate(newDate);
        let res = await getdetection(new Date(e.target.value), parseInt(id), productTypeJson)

        if (Object.keys(res).length == 0) {
            return
        }
        else {
            let arr = JSON.parse(res)
            let fcount = arr.length
            let dcount = 0
            let favg = arr[0]['percentage']

            arr.forEach((element: any) => {
                //fcount += Number(element['count'])
                if (element['names'].split('ME')[0] == '') {
                    dcount += 1
                }
            });

            setObject(arr)
            setFullcount(fcount)
            setAvgF(favg)
            setFullcountdamage(dcount)
        }
    };

    return (
        <>
            <div className="stockrecognition-body2">
                <div className="container-full">
                    <div className="navbar">
                        <h1 className="logo">Stock Recognition</h1>
                        <div className="navbar-redirect">
                            <ul className='redirect-links'>
                                {/*<li><a className='link-item' href="/">Modificar perfil</a></li>*/}
                                <li><a className='link-item' onClick={() => { localStorage.clear() }} href="/login">Cerrar sesión</a></li>
                            </ul>
                            <ul className='redirect-links-mobile'>
                                <li className="link-item" onClick={() => goPhoto()}>Tomar foto</li>
                                <li className="link-item relative"><input type="file" name="image" onChange={(e) => detectUploaded(e)} /> Cargar foto</li>
                                <li className="link-item" onClick={() => showTypeHtml()}>Productos registrados</li>
                                {/*<li className='link-item'>Modificar perfil</li>*/}
                                <li className='link-item'>Cerrar sesión</li>
                            </ul>
                        </div>
                        <i className="uil uil-bars"></i>
                    </div>
                    <div className="body-dashboard">
                        <div className="menu-tablet">
                            <div className="list-menu">
                                <div className="list-items">
                                    <div onClick={() => goPhoto()} className="product-registered-tablet">
                                        <i className="uil uil-camera"></i>
                                        <p>Tomar foto</p>
                                    </div>
                                    <div className="product-registered-tablet">
                                        <i className="uil uil-scenery"></i>
                                        <p>Cargar foto</p>
                                        <input type="file" name="image" onChange={(e) => detectUploaded(e)} />
                                    </div>
                                    <div onClick={() => showTypeHtml()} className="product-registered-tablet">
                                        <i className="uil uil-database"></i>
                                        <p>Productos registrados</p>
                                    </div>
                                    {/*<div onClick={() => testing()} className="product-registered-tablet">
                                        <i className="uil uil-database"></i>
                                        <p>PRUEBA</p>
    </div>*/}
                                </div>
                            </div>
                            <div className="arrow-cont">
                                <i className="uil uil-arrow-to-right"></i>
                            </div>
                        </div>
                        <div className="product-type-list">
                            <span className="message-load">
                                Detección registrada <i className="uil uil-check-circle"></i>
                            </span>
                            <p onClick={() => goBack()} className="return">Atrás</p>
                            <i className="uil uil-times"></i>
                            <img className="product-image-full" src={imageYolo} alt="" />
                            {didSelect ? (
                                <>
                                    {
                                        (showTypes &&
                                            (<div className="row centered">
                                                <div className="left centered flex flexcolumn gap borderright">
                                                    <span className="spantitle">Botellas</span>
                                                    <div className="product-type-item">
                                                        <img onClick={() => getTypeRegistered("inca")} src="image/incak.jpg" alt="" />
                                                        <img onClick={() => getTypeRegistered("sanmateo")} src="image/sanmateo.png" alt="" />
                                                        <img onClick={() => getTypeRegistered("cielo")} src="image/cielo.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="right centered flex flexcolumn gap">
                                                    <span className="spantitle">Latas</span>
                                                    <div className="product-type-item">
                                                        <img onClick={() => getTypeRegistered("redbull")} src="image/redbull.jpg" alt="" />
                                                        <img onClick={() => getTypeRegistered("monster_sa")} src="image/msa2.jpg" alt="" />
                                                        <img onClick={() => getTypeRegistered("monster")} src="image/monster.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>))

                                    }
                                    {
                                        (showTypeRegistered &&
                                            (<div className="row centered">
                                                <div className="left centered flex flexcolumn gap borderright">
                                                    <div className="container-registered-product">
                                                        <p className="p-big mu">{productType}</p>
                                                        <div className="info-registered">
                                                            <p>Seleccione fecha</p>
                                                            <input onChange={(e) => onChangeDate(e)} type="date" id="time" name="time" />
                                                        </div>
                                                        <div className="info-registered">
                                                            <p>Conteo de productos</p>
                                                            <p className="box-p">{fullcount}</p>
                                                        </div>
                                                        <div className="info-registered">
                                                            <p>Productos dañados</p>
                                                            <p className="box-p">{fullcountdamage}</p>
                                                        </div>
                                                        <div className="info-registered">
                                                            <p>Porcentaje detección promedio</p>
                                                            <p className="box-p">{avgF}</p>
                                                        </div>
                                                        <p>Estado de productos</p>
                                                        <div className="table-container">
                                                            <div className="table-label">
                                                                <p className="table-name bold fw">
                                                                    Productos
                                                                </p>
                                                                <p className="table-state bold fw ep">
                                                                    Estados
                                                                </p>
                                                            </div>
                                                            <div className="table-content">
                                                                {object && object.map((element: any, index: any) => {
                                                                    return (
                                                                        <div onClick={(e) => selectRegistered(e, element)} className="table-product" key={index}>
                                                                            <p className="table-name">Producto #{index + 1}</p>
                                                                            {element['names'].split('ME')[0] != '' && <i className="uil uil-check-circle table-state center-state"></i>}
                                                                            {element['names'].split('ME')[0] == '' && <i className="uil uil-times-circle table-state center-state"></i>}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right centered flex flexcolumn gap">
                                                    {didSelectRegistered ?
                                                        (
                                                            <div className="container-registered-product">
                                                                <img className="registered-image" src={dimage} alt="" />
                                                                <div className="info-registered">
                                                                    <p>Producto seleccionado</p>
                                                                    <p className="box-p">{stateProduct}</p>
                                                                </div>
                                                                <div className="info-registered">
                                                                    <p>Estado del producto</p>
                                                                    <p className="box-p">{eproduct}</p>
                                                                </div>
                                                            </div>
                                                        ) :
                                                        (
                                                            <p>Seleccione un producto</p>
                                                        )}
                                                </div>
                                            </div>))
                                    }
                                    {
                                        showDetect &&
                                        (
                                            <>
                                                {
                                                    showYolo && (
                                                        <div className="row centered verify-yolo">
                                                            <div className="left centered flex flexcolumn gap borderright padding-image">
                                                                <img className="product-image" src={imageYolo} alt="" />
                                                            </div>
                                                            <div className="right centered flex flexcolumn gap">
                                                                <div className="colection-info-yolo yolo-tablet">
                                                                    <div className="up">
                                                                        <div className="card-info">
                                                                            <div className="card-up">
                                                                                <p className="bold"># Detectados</p>
                                                                            </div>
                                                                            <div className="card-down">
                                                                                <p className="p-big">{count}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-info">
                                                                            <div className="card-up">
                                                                                <p className="bold">% Detección</p>
                                                                            </div>
                                                                            <div className="card-down">
                                                                                <p className="p-big">{average * 100}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="down">
                                                                        <div className="card-info">
                                                                            <div className="card-up nopadding">
                                                                                <div className="cu-left" onClick={(e) => toggleState(e)}>
                                                                                    <p className="bold">Buen estado</p>
                                                                                </div>
                                                                                <div className="cu-right" onClick={(e) => toggleState(e)}>
                                                                                    <p className="bold">Mal estado</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-down">
                                                                                <div className="products-detected">
                                                                                    {showGoodState && imagesYoloCroppedGood && imagesYoloCroppedGood.map((image: any, index: any) => {
                                                                                        return (<div onClick={(e) => setProduct(e)} className="product-detected-cropped" key={index}>
                                                                                            <img className="cropped-size" src={image} alt="" />
                                                                                            <p>{namesGood[index]}</p>
                                                                                        </div>)
                                                                                    })}
                                                                                    {!showGoodState && imagesYoloCroppedBad && imagesYoloCroppedBad.map((image: any, index: any) => {
                                                                                        return (<div onClick={(e) => setProduct(e)} className="product-detected-cropped" key={index}>
                                                                                            <img className="cropped-size" src={image} alt="" />
                                                                                            <p>{namesBad[index]}</p>
                                                                                        </div>)
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {!loading && <span onClick={() => registrarProducto()} className="button button-dashboard button-tablet">Registrar detección</span>}
                                                                {loading && <i className="uil uil-spinner-alt"></i>}

                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    showState && (
                                                        <>
                                                            <div className="row centered verify-yolo">
                                                                <div className="left centered flex flexcolumn gap borderright padding-image">
                                                                    <img className="state-image" src={imageState} alt="" />
                                                                </div>
                                                                <div className="right centered flex flexcolumn gap reverse">
                                                                    <div className="colection-info-yolo yolo-tablet">
                                                                        <div className="up">
                                                                            <div className="card-info">
                                                                                <div className="card-up">
                                                                                    <p className="bold">Producto seleccionado</p>
                                                                                </div>
                                                                                <div className="card-down">
                                                                                    <p className="p-big">{typeText}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="down">
                                                                            <div className="card-info">
                                                                                <div className="card-up">
                                                                                    <p className="bold">Condición</p>
                                                                                </div>
                                                                                <div className="card-down">
                                                                                    <p className="p-big">{state}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-info">
                                                                                <div className="card-up">
                                                                                    <p className="bold">% Detección</p>
                                                                                </div>
                                                                                <div className="card-down">
                                                                                    <p className="p-big">{averageState}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <span onClick={() => registrarProducto()} className="button button-dashboard button-tablet">Registrar producto</span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>

                            ) : (
                                <p>Seleciona una opción</p>
                            )}
                        </div>

                        <div className="show-info-mobile">
                            <p onClick={() => goBack()} className="return">Atrás</p>
                            <div className="overlay"></div>
                            <div className="image-full">
                                <i className="uil uil-times"></i>
                                <img className="product-image-full" src={imageYolo} alt="" />
                            </div>
                            {didSelect ? (
                                <>
                                    {
                                        (showTypes &&
                                            (<div className="row centered">
                                                <div className="left centered flex flexcolumn gap borderright">
                                                    <span className="spantitle">Botellas</span>
                                                    <div className="product-type-item">
                                                        <img onClick={() => getTypeRegistered("inca")} src="image/incak.jpg" alt="" />
                                                        <img onClick={() => getTypeRegistered("sanmateo")} src="image/sanmateo.png" alt="" />
                                                        <img onClick={() => getTypeRegistered("cielo")} src="image/cielo.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="right centered flex flexcolumn gap">
                                                    <span className="spantitle">Latas</span>
                                                    <div className="product-type-item">
                                                        <img onClick={() => getTypeRegistered("redbull")} src="image/redbull.jpg" alt="" />
                                                        <img onClick={() => getTypeRegistered("monster_sa")} src="image/msa2.jpg" alt="" />
                                                        <img onClick={() => getTypeRegistered("monster")} src="image/monster.jpg" alt="" />
                                                    </div>
                                                </div>
                                            </div>))
                                    }
                                    {
                                        (showTypeRegistered &&
                                            (<div className="row centered">
                                                <div className="left centered flex flexcolumn gap borderright">
                                                    <div className="container-registered-product">
                                                        <p className="p-big mu">{productType}</p>
                                                        <div className="info-registered">
                                                            <p>Seleccione fecha</p>
                                                            <input onChange={(e) => onChangeDate(e)} type="date" id="time" name="time" />
                                                        </div>
                                                        <div className="info-registered">
                                                            <p>Conteo de productos</p>
                                                            <p className="box-p">{fullcount}</p>
                                                        </div>
                                                        <div className="info-registered">
                                                            <p>Productos dañados</p>
                                                            <p className="box-p">{fullcountdamage}</p>
                                                        </div>
                                                        <div className="info-registered">
                                                            <p>Porcentaje detección promedio</p>
                                                            <p className="box-p">{avgF}</p>
                                                        </div>
                                                        <p>Estado de productos</p>
                                                        <div className="table-container">
                                                            <div className="table-label">
                                                                <p className="table-name bold fw">
                                                                    Productos
                                                                </p>
                                                                <p className="table-state bold fw ep">
                                                                    Estados
                                                                </p>
                                                            </div>
                                                            <div className="table-content">
                                                                {object && object.map((element: any, index: any) => {
                                                                    return (
                                                                        <div onClick={(e) => selectRegistered(e, element)} className="table-product" key={index}>
                                                                            <p className="table-name">Producto #{index + 1}</p>
                                                                            {element['names'].split('ME')[0] != '' && <i className="uil uil-check-circle table-state center-state"></i>}
                                                                            {element['names'].split('ME')[0] == '' && <i className="uil uil-times-circle table-state center-state"></i>}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="right centered flex flexcolumn gap">
                                                    {didSelectRegistered ?
                                                        (
                                                            <div className="container-registered-product">
                                                                <img className="registered-image" src={dimage} alt="" />
                                                                <div className="info-registered">
                                                                    <p>Producto seleccionado</p>
                                                                    <p className="box-p">{stateProduct}</p>
                                                                </div>
                                                                <div className="info-registered">
                                                                    <p>Estado del producto</p>
                                                                    <p className="box-p">{eproduct}</p>
                                                                </div>
                                                            </div>
                                                        ) :
                                                        (
                                                            <p>Seleccione un producto</p>
                                                        )}
                                                </div>
                                            </div>))
                                    }
                                    {
                                        showDetect &&
                                        (
                                            <>
                                                {
                                                    showYolo && (
                                                        <div className="row centered verify-yolo">
                                                            <div className="left centered flex flexcolumn gap borderright padding-image godown">
                                                                <img className="product-image" src={imageYolo} alt="" />
                                                            </div>
                                                            <div className="right centered flex flexcolumn gap">
                                                                <div className="colection-info-yolo yolo-tablet">
                                                                    <div className="up">
                                                                        <div className="card-info">
                                                                            <div className="card-up">
                                                                                <p className="bold"># Detectados</p>
                                                                            </div>
                                                                            <div className="card-down">
                                                                                <p className="p-big">{count}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-info">
                                                                            <div className="card-up">
                                                                                <p className="bold">% Detección</p>
                                                                            </div>
                                                                            <div className="card-down">
                                                                                <p className="p-big">{average * 100}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="down">
                                                                        <div className="card-info">
                                                                            <div className="card-up nopadding">
                                                                                <div className="cu-left" onClick={(e) => toggleState(e)}>
                                                                                    <p className="bold">Buen estado</p>
                                                                                </div>
                                                                                <div className="cu-right" onClick={(e) => toggleState(e)}>
                                                                                    <p className="bold">Mal estado</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-down">
                                                                                <div className="products-detected">

                                                                                    {showGoodState && imagesYoloCroppedGood && imagesYoloCroppedGood.map((image: any, index: any) => {
                                                                                        return (<div onClick={(e) => setProduct(e)} className="product-detected-cropped" key={index}>
                                                                                            <img className="cropped-size" src={image} alt="" />
                                                                                            <p>{namesGood[index]}</p>
                                                                                        </div>)
                                                                                    })}
                                                                                    {!showGoodState && imagesYoloCroppedBad && imagesYoloCroppedBad.map((image: any, index: any) => {
                                                                                        return (<div onClick={(e) => setProduct(e)} className="product-detected-cropped" key={index}>
                                                                                            <img className="cropped-size" src={image} alt="" />
                                                                                            <p>{namesBad[index]}</p>
                                                                                        </div>)
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <span onClick={() => registrarProducto()} className="button button-dashboard button-tablet">Registrar detección</span>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    showState && (
                                                        <>
                                                            <div className="row centered verify-yolo">
                                                                <div className="left centered flex flexcolumn gap borderright padding-image">
                                                                    <img className="state-image" src={imageState} alt="" />
                                                                </div>
                                                                <div className="right centered flex flexcolumn gap reverse">
                                                                    <div className="colection-info-yolo yolo-tablet">
                                                                        <div className="up">
                                                                            <div className="card-info">
                                                                                <div className="card-up">
                                                                                    <p className="bold">Producto seleccionado</p>
                                                                                </div>
                                                                                <div className="card-down">
                                                                                    <p className="p-big">{typeText}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="down">
                                                                            <div className="card-info">
                                                                                <div className="card-up">
                                                                                    <p className="bold">Condición</p>
                                                                                </div>
                                                                                <div className="card-down">
                                                                                    <p className="p-big">{state}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-info">
                                                                                <div className="card-up">
                                                                                    <p className="bold">% Detección</p>
                                                                                </div>
                                                                                <div className="card-down">
                                                                                    <p className="p-big">{averageState}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <span onClick={() => registrarProducto()} className="button button-dashboard button-tablet">Registrar producto</span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>

                            ) : (
                                <div className="options-dashboard">
                                    <div className="takedesc">
                                        <span className="button button-dashboard" onClick={() => goPhoto()}>Tomar foto</span>
                                        <span className="desc desca">Solo valido para San mateo, Incakola, Monter y Redbull</span>
                                    </div>
                                    <div className="galerydesc" >
                                        <span className="button button-dashboard" >Cargar foto</span>
                                        <span className="desc descb">Elige foto de tu galería algún producto del tipo San mateo, Incakola, Monter y Redbull</span>
                                        <input type="file" name="image" onChange={(e) => detectUploaded(e)} />
                                    </div>
                                    <div className="productdesc">
                                        <span className="button button-dashboard" onClick={() => showTypeHtml()}>Productos registrados</span>
                                        <span className="desc descc">Se muestran todas las detecciones hechas por el usuario</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;