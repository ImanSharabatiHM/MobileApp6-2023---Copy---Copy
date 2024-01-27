import dayjs from "dayjs";

const YEARSFORRAYIC = () => {
  const years = [];
  let dateStart = dayjs().subtract(5, "year").format("YYYY");
  let dateEnd = dayjs().format("YYYY");
  while (dateEnd - dateStart >= 0) {
    years.push({
      label: dateStart,
      value: dateStart,
    });
    dateStart++;
  }
  return years;
};

const UUIDV4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const MPIFORM = (params) => {
  return (
    `
    @"<html>
    <head>
      <meta name="viewport" content="width=device-width" />
      <title>MpiForm</title>
      <script>
        function postPage() {
        document.forms["frmMpiForm"].submit();
        }
      </script>
    </head>
    <body onload="javascript:postPage();">
      <form style="display:none;" action="` +
    params.acsUrl +
    `" method="post" id="frmMpiForm" name="frmMpiForm">
        <input type="hidden" name="PaReq" value="` +
    params.paReq +
    `" />
        <input type="hidden" name="TermUrl" value="` +
    params.termURL +
    `" />
        <input type="hidden" name="MD" value="` +
    params.md +
    `" />
        <noscript>
          <input type="submit" id="btnSubmit" value="Gönder" />
        </noscript>
      </form>
    </body>
    </html>"
    `
  );
};

const POSTALURL = "https://postcode.palestine.ps/Mapweb-HebronMun.html";
const PROJECTMAP="https://www.arcgis.com/apps/MapSeries/index.html?appid=fbef757828e04e588192f4d00ea347f2";
const PROJECTPUBLICMAP="https://www.arcgis.com/apps/instant/portfolio/index.html?appid=f68f45c1ed624cad93ef5a7040249990";

const CADASTRAL="http://10.11.16.101/cadastral/#";
const MAPLOCATIONURL="http://82.213.32.201/MapLoc";
const HMURL="http://www.hebron-city.ps";
const ILCEKODU = "";
const PLACESMAP="https://www.openstreetmap.org/?mlat=31.53770&mlon=35.10037#map=19/31.53770/35.10037";
const USERSECRET = "";
const ANONIMTAHAKKUKSORGULAMAPARAMETRE =
  "AnonimTahakkukSorgulamaParametreListesi";
const BELGEVERILECEKKURUMLISTESI =
  "EmlakVergisiBildirimSuretiVerilecekKurumListesi";
const BEYAN_BINA_DOSYA = "BEYAN_BINA_DOSYA";
const BEYAN_ARSA_DOSYA = "BEYAN_ARSA_DOSYA";
const BEYAN_ARAZI_DOSYA = "BEYAN_ARAZI_DOSYA";
const BEYAN_CEVRE_DOSYA = "BEYAN_CEVRE_DOSYA";
const BEYAN_ILAN_DOSYA = "BEYAN_ILAN_DOSYA";
const EDEVLETALERTMESSAGE = `للاستفادة من هذه الخدمة ، يجب عليك تسجيل الدخول إلى النظام باستخدام إحدى طرق المصادقة التالية ، والتي تناسبك.     
كلمة مرور الحكومة الإلكترونية
توقيع المحمول
التوقيع الإلكتروني
ت. بطاقة الهوية
بنك`;

const EDEVLETALERTMESSAGETITLE = "لم يتمّ تسجيل الدخول حتى الآن..";

export default {
  PROJECTPUBLICMAP,
  PROJECTMAP,
  YEARSFORRAYIC,
  ILCEKODU,
  USERSECRET,
  UUIDV4,
  POSTALURL,
  HMURL,
  MAPLOCATIONURL,
  ANONIMTAHAKKUKSORGULAMAPARAMETRE,
  BELGEVERILECEKKURUMLISTESI,
  EDEVLETALERTMESSAGE,
  EDEVLETALERTMESSAGETITLE,
  BEYAN_BINA_DOSYA,
  BEYAN_ARSA_DOSYA,
  BEYAN_ARAZI_DOSYA,
  BEYAN_CEVRE_DOSYA,
  BEYAN_ILAN_DOSYA,
  CADASTRAL,
  MPIFORM,
  PLACESMAP
};
