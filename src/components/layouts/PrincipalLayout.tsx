"use client";
import Image from "next/image";
import styles from "./PrincipalLayout.module.css";
import { MenuProps, Dropdown, Menu, Layout } from "antd";
import Link from "next/link";
import { string } from "prop-types";
import { Footer, Header, Content } from "antd/es/layout/layout";
import {
  CarOutlined,
  CreditCardOutlined,
  FacebookFilled,
  HeartOutlined,
  InstagramFilled,
  PhoneOutlined,
  SearchOutlined,
  SecurityScanOutlined,
  ShoppingOutlined,
  TwitterSquareFilled,
  UserOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { Arimo, Cabin } from "next/font/google";
import { signIn, useSession } from "next-auth/react";

const itemsFooter = [
  { key: "nosotros", label: "Nosotros", src: "#" },
  { key: "Cuida", label: "Cuida tu Reloj", src: "#" },
  { key: "cuenta", label: "Mi cuenta", src: "#" },
  { key: "Términos", label: "Términos y condiciones", src: "#" },
  { key: "Aviso", label: "Aviso de privacidad", src: "#" },
  { key: "Política", label: "Política de tratamiento de datos", src: "#" },
  { key: "Venta", label: "Venta al por mayor", src: "#" },
  { key: "Recoge", label: "Recoge en tienda", src: "#" },
  { key: "Gafas", label: "Gafas de sol", src: "#" },
  { key: "SIC", label: "SIC", src: "#" },
  { key: "Contáctanos", label: "Contáctanos", src: "#" },
  { key: "Tiendas", label: "Tiendas", src: "#" },
  { key: "Comunicados", label: "Comunicados", src: "#" },
];

const itemsNav: MenuProps["items"] = [
  {
    key: "RELOJES",
    label: <p>RELOJES</p>,
    children: [
      { key: "hombre", label: "Hombre" },
      { key: "Mujer", label: "Mujer" },
      { key: "Automáticos", label: "Automáticos" },
      { key: "Swiss made", label: "Swiss made" },
      { key: "Colecciones", label: "Colecciones" },
      { key: "Nuevos", label: "Nuevos" },
    ],
  },
  {
    label: <p>EDICIÓN ESPECIAL</p>,
    key: "ESPECIAL",
    children: [
      { key: "Dc comics", label: "Dc comics" },
      { key: "Disney", label: "Disney" },
      { key: "Marvel", label: "Marvel" },
      { key: "Star wars", label: "Star wars" },
      { key: "Simpsons", label: "Simpsons" },
      { key: "Bolt", label: "Bolt" },
      { key: "Reserve", label: "reserve" },
    ],
  },
  {
    label: <p>ACCESORIOS</p>,
    key: "ACCESORIOS",
    children: [
      { key: "Gafas de sol", label: "Gafas de sol" },
      { key: "Pulseras", label: "Pulseras" },
      { key: "Correas de repuesto", label: "Correas de repuesto" },
      { key: "Cajas de impacto", label: "Cajas de impacto" },
    ],
  },
  {
    label: <p>DESTACADO</p>,
    key: "DESTACADO",
    children: [
      { key: "Mejor vendidos", label: "Mejor vendidos" },
      { key: "Ultimas unidades", label: "Ultimas unidades" },
      { key: "Recomendación del mes", label: "Recomendación del mes" },
    ],
  },
  {
    label: <p>THECNOMARINE</p>,
    key: "THECNOMARINE",
    children: [
      { key: "Relojes desde 299.900", label: "Relojes desde 299.900" },
      { key: "Hasta 80% de descuento", label: "Hasta 80% de descuento" },
    ],
  },
  {
    label: (
      <div className={`${styles.blackDaysNav}`}>
        <p>BLACK DAYS</p>
      </div>
    ),
    key: "BLACK",
    children: [
      { key: "hombre", label: "Hombre" },
      { key: "Mujer", label: "Mujer" },
      { key: "Automáticos", label: "Automáticos" },
      { key: "Swiss made", label: "Swiss made" },
      { key: "Colecciones", label: "Colecciones" },
      { key: "Nuevos", label: "Nuevos" },
    ],
  },
];

const menuStyle = {
  backgroundColor: "transparent",
  color: "white",
  border: "none",
  boxShadow: "none",
  paddingTop: "10px",
};
const arimoFont = Arimo({ weight: "400", style: "normal", preload: false });
const cabinFont = Cabin({ weight: "400", style: "normal", preload: false });
function PrincipalLayout({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  return (
    <Layout>
      <Header className={`${styles.containerHeader} ${arimoFont.className}`}>
        <section className={`${styles.headerTopContainer}`}>
          <div>
            <CarOutlined />
            <Link href={"#"}>Envíos a toda Colombia</Link>
          </div>
          |
          <div>
            <PhoneOutlined />
            <Link href={"#"}>contactanós</Link>
          </div>
          |
          {!data ? (
            <div>
              <UserOutlined />
              <Link href={"#"} onClick={() => signIn()}>
                Inicio de sesión
              </Link>
            </div>
          ) : (
            <div>
              <UserOutlined />
              <Link href={"#"} onClick={() => signIn()}>
                Cerrar sesión
              </Link>
            </div>
          )}
        </section>
        <section className={`${styles.containerNav}`}>
          <Image
            className={`${styles.logo}`}
            alt="invicta name"
            src={
              "https://invicta.com.co/cdn/shop/files/logo-invicta_180x.png?v=1614355512"
            }
            width={175}
            height={50}
          />

          <Image
            className={`${styles.verify}`}
            alt="shopify calificate"
            src={
              "https://cdn.shopify.com/s/files/1/0275/8420/0792/files/logo-invicta-col.png?v=1605634902"
            }
            width={50}
            height={77}
          />
          <div className="flex shrink grow" />

          <nav className={`${styles.itemsNav}`}>
            <div className="flex flex-col min-w-0 shrink">
              <Menu
                className="flex justify-center"
                items={itemsNav}
                mode="horizontal"
                theme="dark"
                inlineCollapsed={true}
                style={menuStyle}
              />
            </div>
            <section className={`${styles.iconsContainer}`}>
              <SearchOutlined className={styles.iconsNav} />
              <HeartOutlined className={styles.iconsNav} />
              <ShoppingOutlined className={styles.iconsNav} />
            </section>
          </nav>
        </section>

        <section className={`${styles.headerFooterContainer}`}>
          <span className={styles.move2}>
            <div>
              <CreditCardOutlined />
              <span>DISTRIBUIDORES OFICIALES EN COLOMBIA</span>
            </div>
            <div>
              <SecurityScanOutlined />
              <span>SEGURIDAD EN TU COMPRA</span>
            </div>
            <div>
              <CarOutlined />
              <span>ENTREGA EN 24 HORAS EN LA CIUDAD DE BOGOTÁ</span>
            </div>{" "}
            <div>
              <PhoneOutlined />
              <span>
                CELULAR: (57) 333-6025027 FIJO: (1) 654-0434 OPCIÓN: 1
              </span>
            </div>
          </span>
        </section>
      </Header>
      <Content className={`${styles.containerMain}`}>{children}</Content>
      <Footer className={`${styles.containerFooter}`}>
        <article className={`${styles.topFooter}`}>
          <h2 className={`${cabinFont.className}`}>INVICTA AL DÍA</h2>
          <div className={`${arimoFont.className}`}>
            <p>INSCRIBETE A NUESTRO NEWSLETTER PARA CONOCER</p>
            <p>ACERCA DE NUESTRAS PROMOCIONES, EVENTOS Y DESCUENTOS VIGENTES</p>
          </div>
        </article>
        <form className={`${styles.formFooterContainer}`}>
          <div>
            <input
              type="text"
              className={`${styles.email} ${styles.footerEmailInput}`}
              id="email "
            />
            <button className={`${cabinFont.className}`}>
              <b>SUSCRIBIRSE</b>
            </button>
          </div>
          <input type="checkbox" name="auth" id="auth" />
          <span>
            Autorizo el tratamiento de mis <b>Datos personales</b>
          </span>
        </form>
        <Image
          src={
            "https://cdn.shopify.com/s/files/1/0250/1433/7599/files/banner-categoria-mexico-tiendas_Mesa_de_trabajo_1_copia_2.jpg?v=1585315781"
          }
          alt="consulta"
          width={1100}
          height={500}
        />
        <article className={`${styles.redIconsContainer}`}>
          <h2>SIGUE A INVICTA</h2>
          <div className={`${styles.iconsRed}`}>
            <FacebookFilled />
            <InstagramFilled />
            <TwitterSquareFilled />
            <YoutubeFilled />
          </div>
        </article>
        <ul className={`${styles.footerBottomContainer}`}>
          {itemsFooter.map((items) => (
            <li key={items.key}>
              <Link href={items.src}>{items.label}</Link>
            </li>
          ))}
        </ul>
        <div className={`${styles.footerBottomImages}`}>
          <Image
            alt={"camara"}
            src={
              "https://cdn.shopify.com/s/files/1/0275/8420/0792/files/Logo_footer_1.png?v=1591306083"
            }
            width={600}
            height={400}
          />
          <Image
            alt={"camara"}
            src={"/logo-invencible.svg"}
            width={600}
            height={400}
          />
        </div>
      </Footer>
    </Layout>
  );
}

export default PrincipalLayout;
