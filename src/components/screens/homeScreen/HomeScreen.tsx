"use client";
import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import styles from "./homeScreen.module.css";
import { Cabin } from "next/font/google";

import ProductSlider from "@/components/Sliders/productSlider/ProductSlider";
import { Product } from "@/interface/interfaceProducts";
import { Rate } from "antd";

const cabinFont = Cabin({ weight: "400", style: "normal", preload: false });

interface Props {
  products: Product[];
}

function HomeScreen({ products }: Props) {
  const [glasses, setGlasses] = useState(
    products.filter((product) => product.idProductType === 2)
  );
  const [clocks, setClocks] = useState(
    products.filter((product) => product.idProductType === 1)
  );
  return (
    <article className={`${styles.containerScreen}`}>
      <section>
        <Slider
          dots
          infinite
          speed={500}
          slidesToShow={1}
          autoplay
          autoplaySpeed={3000}
        >
          <figure className={`${styles.PrincipalCarrouselImage}`}>
            <Image
              alt="offert"
              width={1600}
              height={400}
              src={
                "https://invicta.com.co/cdn/shop/files/GENERAL_Mesa_de_trabajo_1_copia_1.jpg?v=1700171839"
              }
            />
          </figure>
          <figure className={`${styles.PrincipalCarrouselImage}`}>
            <Image
              alt="offert"
              width={1600}
              height={800}
              src={
                "https://invicta.com.co/cdn/shop/files/A_SOLO_Mesa_de_trabajo_1_copia.jpg?v=1700172095"
              }
            />
          </figure>
          <figure className={`${styles.PrincipalCarrouselImage}`}>
            <Image
              alt="offert"
              width={1600}
              height={800}
              src={
                "https://invicta.com.co/cdn/shop/files/GAFAS_banner-principal-1920_copia_1_54f793f9-b133-4e3f-aed9-d78459eeb4c4.jpg?v=1698881171"
              }
            />
          </figure>
          <figure className={`${styles.PrincipalCarrouselImage}`}>
            <Image
              alt="offert"
              width={1600}
              height={800}
              src={
                "https://invicta.com.co/cdn/shop/files/RECOGE_EN_TIENDA_banner-principal-1920_copia.jpg?v=1692827860"
              }
            />
          </figure>
        </Slider>
        <h2 className={`${cabinFont.className} ${styles.titleSection}`}>
          RELOJES INVICTA COLOMBIA
        </h2>
      </section>
      <section>
        <div className={`${styles.sectionWarranty}`}>
          <Image
            alt="Despacho"
            width={300}
            height={150}
            src={
              "https://invicta.com.co/cdn/shop/files/Group-308_200x100@2x.webp?v=1660949267"
            }
          />
          <Image
            alt="Despacho"
            width={300}
            height={150}
            src={
              "https://invicta.com.co/cdn/shop/files/Group-297_200x100@2x.webp?v=1660949267"
            }
          />
          <Image
            alt="Despacho"
            width={300}
            height={150}
            src={
              "https://invicta.com.co/cdn/shop/files/Group-296_200x100@2x.webp?v=1660949267"
            }
          />
          <Image
            alt="Despacho"
            width={300}
            height={150}
            src={
              "https://invicta.com.co/cdn/shop/files/Group-309_200x100@2x.webp?v=1660949267"
            }
          />
        </div>
      </section>
      <section className={`${styles.sectionPromo}`}>
        <Image
          alt="promo"
          width={580}
          height={279}
          src={
            "https://invicta.com.co/cdn/shop/files/DESDE_299_banner-sub-desk-1080x540_1_7b32375d-3261-4b2c-9253-be7571c89c38_720x.jpg?v=1700172329"
          }
        />
        <Image
          alt="promo"
          width={580}
          height={279}
          src={
            "https://invicta.com.co/cdn/shop/files/SUPER_OFERTAS_banner-sub-desk-1080x540_1_720x.jpg?v=1700172547"
          }
        />
      </section>
      <ProductSlider title="¡RELOJES DESDE $299,900!" products={products} />
      <section className={`${cabinFont.className}`}>
        <Image
          alt="prom"
          src={
            "https://cdn.shopify.com/s/files/1/0275/8420/0792/files/RECIBE_TU_COMPRA_EN_24_HORAS_banner-categoria-desktop.jpg?v=1692892882"
          }
          width={1600}
          height={200}
        />
        <button className="bg-yellow-300 w-full p-1">
          <b>Ver mas</b>
        </button>
      </section>
      <ProductSlider title="¡EL MEJOR PRECIO!" products={clocks} />
      <section className={`${cabinFont.className}`}>
        <Image
          alt="prom"
          src={
            "https://cdn.shopify.com/s/files/1/0275/8420/0792/files/super-ofertas_1920x300_copia_8bfacde1-23cc-48f7-98de-7bcdc545ce5c.jpg?v=1699374686"
          }
          width={1600}
          height={200}
        />
        <button className="bg-yellow-300 w-full p-1">
          <b>Ver mas</b>
        </button>
      </section>
      <ProductSlider title="¡GAFAS DE SOL!" products={glasses} />
      <section className={`flex flex-col items-center`}>
        <h2 className={`${cabinFont.className} text-lg `}>
          {" "}
          DEJAMOS QUE SEAN LOS CLIENTES LOS QUE HABLEN POR NOSOTROS.
        </h2>
        <Rate defaultValue={5} disabled />
        <p>2499 opiniones en total</p>
      </section>
    </article>
  );
}
/*  */
export default HomeScreen;
