import banner1 from "../assets/saraiva_banner.jpg";
import banner2 from "../assets/saraiva_banner2.jpg";
import banner3 from "../assets/saraiva_banner3.jpg";
import Footer from "../components/components_home_page/Footer.tsx";
import SugestaoDeLivros from "../components/SugestaoDeLivros.tsx";


const HomePage = () => {

    return (
        <>
            {/*Carrosel*/}
            <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={banner1} className="w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={banner2} className="w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={banner3} className="w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/*Amostra de livros*/}

            <div className="d-flex flex-column align-items-center mb-4">
                <h4>
                    Você pode se interessar
                </h4>
                <div className={"w-75 p-5"}>
                    {/*  components livros  */}
                    <SugestaoDeLivros/>
                </div>
            </div>

            {/*footer*/}
            <Footer/>

        </>
    )
}

export default HomePage

//TODO adcionar links de livros