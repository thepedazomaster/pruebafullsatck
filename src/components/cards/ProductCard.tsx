import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { Cabin } from "next/font/google";
import Link from "antd/es/typography/Link";

interface Props {
  id: number;
  name: string;
  image: string;
  reduction: number;
  favorite?: boolean;
  svgRate: number | null;
  price: number;
  numberRate?: number;
  subTotal: number;
}
const cabinFont = Cabin({ weight: "400", style: "normal", preload: false });

function ProductCard({
  id,
  name,
  image,
  reduction,
  favorite = false,
  svgRate,
  numberRate,
  price,
  subTotal,
}: Props) {
  return (
    <Link
      href={`/product/${id}`}
      className={`${styles.cardContainer} ${cabinFont.className}`}
    >
      <div className={`${styles.AditionalContainer}`}>
        <div className={`${styles.reductionContainer}`}>{reduction}%</div>
        {favorite ? <HeartFilled /> : <HeartOutlined />}
      </div>
      <Image alt={name} src={image} width={200} height={200} />
      <h2>
        <b>{name}</b>
      </h2>
      {svgRate ? (
        <div className={styles.rateContainer}>
          <Rate defaultValue={svgRate} disabled />
          <p>{numberRate} Opiniones</p>
        </div>
      ) : null}
      <div className={styles.pricesContainer}>
        {reduction ? (
          <p style={{ textDecoration: "line-through" }}>
            <b>
              {price.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              })}
            </b>
          </p>
        ) : null}
        <p className="text-red-500">
          <b>
            {subTotal.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
            })}
          </b>
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
