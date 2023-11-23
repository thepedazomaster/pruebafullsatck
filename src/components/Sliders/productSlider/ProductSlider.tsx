"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./productSlider.module.css";
import { Product } from "@/interface/interfaceProducts";
import ProductCard from "@/components/cards/ProductCard";

interface Props {
  title: string;
  products: Product[];
}

function ProductSlider({ title, products }: Props) {
  return (
    <article className={`${styles.container}`}>
      <h2 className={`${styles.title}`}>{title}</h2>
      <Slider
        centerMode
        dots={false}
        infinite
        speed={500}
        slidesToShow={4}
        slidesToScroll={4}
        autoplay
        autoplaySpeed={3000}
        responsive={[
          { breakpoint: 960, settings: { slidesToScroll: 3, slidesToShow: 3 } },
          { breakpoint: 720, settings: { slidesToScroll: 2, slidesToShow: 2 } },
          { breakpoint: 420, settings: { slidesToScroll: 1, slidesToShow: 1 } },
        ]}
      >
        {products.map((product) => (
          <ProductCard
            {...product}
            key={product.id}
            image={product.images[0].url}
          />
        ))}
      </Slider>
      <button className={`${styles.buttonMore}`}>
        {" "}
        <b>Ver todo</b>
      </button>
    </article>
  );
}

export default ProductSlider;
