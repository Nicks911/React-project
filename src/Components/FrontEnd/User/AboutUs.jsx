import "../../../App.css";

const AboutUs = () => {
  return (
    <div style={{
      display: "flex",
      gap: 24,
      alignItems: "flex-start",
      padding: 24,
      paddingTop: 100,
      flexWrap: "wrap",
      boxSizing: "border-box",
    }}>
      <img
        src="/src/assets/SharedAsset/logo.png"
        alt="Foto Salon"
        style={{
        width: 400,
        height: 600,
        objectFit: "cover",
        borderRadius: 8,
        flex: "0 0 auto",}}
      />

      <div style={{
        flex: 1,
        minWidth: 280,
        marginTop: 20}}>
        <h1 className="sectionTitle">Salon Cantik Indah</h1>
        <p>
          Salon Cantik Indah menyediakan layanan potong rambut, styling, perawatan
          wajah, manicure & pedicure, serta treatment profesional lainnya dengan
          tenaga ahli berpengalaman.
        </p>

        <div style={{ marginTop: 16 }}>
          <h3 className="sectionTitle">Kontak</h3>
          <p>
            Telepon: <a href="tel:+628123456789">+62 898-5452-5596</a>
          </p>
          <p>
            Email: <a href="mailto:info@saloncantikindah.com">info@saloncantikindah.com</a>
          </p>
          <p>
            WhatsApp: <a href="https://wa.me/628123456789" target="_blank" rel="noreferrer">Chat via WhatsApp</a>
          </p>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3 className="sectionTitle">Lokasi</h3>
          <p>Jl. Gubeng Kertajaya V F Blok F No.32, Airlangga, Kec. Gubeng, Surabaya
RT.007/RW.03</p>
          <p>Jam buka: Senin - Sabtu, 09:00 - 20:00</p>
        </div>

        <div style={{ marginTop: 16 }}>
          <h3 className="sectionTitle">Sosial Media</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 8 }}>
            <li>
              Instagram: <a href="" target="" rel="noreferrer">@saloncantikindah</a>
            </li>
            <li>
              Facebook: <a href="" target="" rel="noreferrer">Salon Cantik Indah</a>
            </li>
            <li>
              TikTok: <a href="" target="" rel="noreferrer">@saloncantikindah</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;