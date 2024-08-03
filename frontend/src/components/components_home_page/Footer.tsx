const Footer = () => {
    return (
        <>
            {/*Rodape*/}
            <footer>
                <div className="bg-warning-subtle d-flex align-items-center flex-column p-3">
                    <h4 className="m-3">
                        Quero Receber Novidades!
                    </h4>

                    <div className="m-3">
                        Inscreva-se para promoções e conteúdos exclusivos
                    </div>


                    <div className="d-flex align-items-center justify-content-around w-50">

                        <input type="email" className="form-control m-2" id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               placeholder="Seu nome"/>


                        <input type="password" className="form-control m-2" id="exampleInputPassword1"
                               placeholder="Seu Email"/>

                        <button type="submit" className="btn btn-warning m-2 w-75">Cadastrar</button>
                    </div>

                </div>

                <div className="p-4 d-flex justify-content-around bg-warning align-items-center">
                    <div className="m-2">
                        <i className="bi bi-book-half h1"></i>
                        Livraria
                    </div>

                    <div className="m-2 d-flex justify-content-between">
                        <div><i className="bi bi-twitter-x h3 m-2"></i></div>
                        <div><i className="bi bi-youtube h3 m-2"></i></div>
                        <div><i className="bi bi-instagram h3 m-2"></i></div>
                        <div><i className="bi bi-facebook h3 m-2"></i></div>
                    </div>

                </div>

                <div className="bg-black w-100 d-flex justify-content-center">
                    <div className="d-flex p-4 m-4 flex-column">
                        <h4 className="text-white mb-2">
                            Atendimento
                        </h4>

                        <a href="" className="text-white text-decoration-none disabled">
                            Política de Vendas, Trocas e Privacidade
                        </a>
                        <a href="" className="text-white text-decoration-none disabled">
                            Termos e Condições de Compra
                        </a>
                        <a href="" className="text-white text-decoration-none disabled">
                            Fale Conosco
                        </a>
                    </div>
                    <div className="d-flex p-4 m-4 flex-column">
                        <h4 className="text-white mb-2">
                            Institucional
                        </h4>

                        <a href="" className="text-white text-decoration-none disabled">
                            Sobre a Livraria
                        </a>
                        <a href="" className="text-white text-decoration-none disabled">
                            Trabalhe Conosco
                        </a>
                        <a href="" className="text-white text-decoration-none disabled">
                            Seja um Parceiro
                        </a>
                    </div>
                    <div className="p-4 m-4">
                        <h4 className="text-white mb-2">
                            Formas de Pagamento
                        </h4>

                        <div className="d-flex justify-content-between">
                            <div className="pr0 items-stretch vtex-flex-layout-0-x-stretchChildrenWidth   flex"
                                 style={{width: 50}}><img
                                title="" sizes="" srcSet="" alt="" style={{width: 50, height: 30}}
                                className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--payment-methods-icon vtex-render-runtime-8-x-lazyload lazyloaded"
                                loading="lazy" crossOrigin="anonymous"

                                src="https://lojasaraivanew.vtexassets.com/assets/vtex/assets-builder/lojasaraivanew.lojasaraivanew-theme/2.0.4/icons/payment-american-express___98bd3a2af353833a7e657d2c069bce5b.svg"/>
                            </div>
                            <div className="pr0 items-stretch vtex-flex-layout-0-x-stretchChildrenWidth   flex"
                                 style={{width: 50}}><img
                                title="" sizes="" srcSet="" alt="" style={{width: 50, height: 30}}
                                className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--payment-methods-icon vtex-render-runtime-8-x-lazyload lazyloaded"
                                loading="lazy" crossOrigin="anonymous"

                                src="https://lojasaraivanew.vtexassets.com/assets/vtex/assets-builder/lojasaraivanew.lojasaraivanew-theme/2.0.4/icons/payment-visa___4d52d322828aaab3b83fa55d2a4760e4.svg"/>
                            </div>
                            <div className="pr0 items-stretch vtex-flex-layout-0-x-stretchChildrenWidth   flex"
                                 style={{width: 50}}><img
                                title="" sizes="" srcSet="" alt="" style={{width: 50, height: 30}}
                                className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--payment-methods-icon vtex-render-runtime-8-x-lazyload lazyloaded"
                                loading="lazy" crossOrigin="anonymous"

                                src="https://lojasaraivanew.vtexassets.com/assets/vtex/assets-builder/lojasaraivanew.lojasaraivanew-theme/2.0.4/icons/payment-elo___25267c8c59652a9140192cf914c688bb.svg"/>
                            </div>
                            <div className="pr0 items-stretch vtex-flex-layout-0-x-stretchChildrenWidth   flex"
                                 style={{width: 50}}><img
                                title="" sizes="" srcSet="" alt="" style={{width: 50, height: 30}}
                                className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--payment-methods-icon vtex-render-runtime-8-x-lazyload lazyloaded"
                                loading="lazy" crossOrigin="anonymous"

                                src="https://lojasaraivanew.vtexassets.com/assets/vtex.file-manager-graphql/images/5ea7017f-68ae-4c6e-84f2-07f310a55295___30f3893de1424b28608330eb5f4963be.jpeg"/>
                            </div>
                            <div className="pr0 items-stretch vtex-flex-layout-0-x-stretchChildrenWidth   flex"
                                 style={{width: 50}}><img
                                title="" sizes="" srcSet="" alt="" style={{width: 50, height: 30}}
                                className="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--payment-methods-icon vtex-render-runtime-8-x-lazyload lazyloaded"
                                loading="lazy" crossOrigin="anonymous"

                                src="https://lojasaraivanew.vtexassets.com/assets/vtex/assets-builder/lojasaraivanew.lojasaraivanew-theme/2.0.4/icons/payment-mastercard___6adf221ddd2074bcc3a786e08796e798.svg"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-100 p-4">
                    Livraria © - Todos os direitos reservados.
                </div>

            </footer>
        </>
    )
}

export default Footer

//TODO adicionar funcao para quero receber novidades (um modal simples)