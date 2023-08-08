import client from "./client";

const endpoint = "/edevlet";
const paymentEndpoint = "/payment";
const evrakEndpoint = "/evrak";

const evrakDogrula = (evrakSayi, dogrulamaKodu) =>
  client.get(evrakEndpoint + "/dogrula", {
    evrakSayi,
    dogrulamaKodu,
  });

const evrakIndir = (evrakSayi, dogrulamaKodu) =>
  client.get(evrakEndpoint + "/indir", {
    evrakSayi,
    dogrulamaKodu,
  });

const createEnrollment = (enrollment) =>
  client.post(paymentEndpoint + "/enrollment", enrollment);

const getArsaRayicBedel = (yil, mahalleKodu, caddeSokakKodu) =>
  client.get(endpoint + "/arsaRayicBedel", {
    yil,
    mahalleKodu,
    caddeSokakKodu,
  });

const getCopToplamaBilgisi = (mahalleKodu, caddeSokakKodu) =>
  client.get(endpoint + "/copToplamaBilgisi", {
    mahalleKodu,
    caddeSokakKodu,
  });

const getEncumenKararlari = (kararTarihi, kararNo, aramaMetni) =>
  client.get(endpoint + "/encumenKarar", {
    kararTarihi,
    kararNo,
    aramaMetni,
  });

const getNobetciEczaneler = (tarih) =>
  client.get(endpoint + "/nobetciEczane", {
    tarih,
  });

const getMeclisKararlari = (kararTarihi, kararNo, aramaMetni) =>
  client.get(endpoint + "/meclisKarar", {
    kararTarihi,
    kararNo,
    aramaMetni,
  });

const getImarBilgisi = (
  sorguTur,
  mahalleKodu,
  caddeSokakKodu,
  kapiNo,
  ada,
  parsel
) =>
  client.get(endpoint + "/imarBilgisi", {
    sorguTur,
    mahalleKodu,
    caddeSokakKodu,
    kapiNo,
    ada,
    parsel,
  });

const getBarkodluBelgeDogrula = (tcKimlikNo, barkodNo) =>
  client.post(endpoint + "/barkodluBelgeDogrula", {
    tcKimlikNo,
    barkodNo,
  });

const getEncumenKararTarih = (yil) =>
  client.get(endpoint + "/encumenKararTarih", { yil });

const getMeclisKararTarih = (yil) =>
  client.get(endpoint + "/meclisKararTarih", { yil });

const getFaaliyetler = () => client.get(endpoint + "/faaliyetler");

const getEncumenGundemler = () => client.get(endpoint + "/encumenGundem");
const getMeclisGundemler = () => client.get(endpoint + "/meclisGundem");

const getHizmetler = (belediyeMudurlukKodu) =>
  client.get(endpoint + "/hizmetler", { belediyeMudurlukKodu });

const getAskidaImarPlanlari = () => client.get(endpoint + "/imarPlanlari");
const getMakbuz = (kimlik_VergiNo, makbuzNo) =>
  client.get(endpoint + "/makbuz", { kimlik_VergiNo, makbuzNo });

const getBorclar = (sorguParametresi, sorguParametreTuru, isAnonim) => {
  if (isAnonim)
    return client.get(endpoint + "/anonimborclar", {
      sorguParametresi,
      sorguParametreTuru,
    });
  else return client.get(endpoint + "/borclar");
};

const getNikahSalonDurum = (nikahSalonKodu, tarih) =>
  client.get(endpoint + "/nikahSalonDurum", {
    nikahSalonKodu,
    tarih,
  });

const getNikahSalonlari = () => client.get(endpoint + "/nikahSalon");

const getIhaleler = () => client.get(endpoint + "/ihaleler");

const getMudurlukler = () => client.get(endpoint + "/mudurlukler");

const getIlceler = () => client.get(endpoint + "/ilceler");

const getMahalleler = (ilceKodu) =>
  client.get(endpoint + "/mahalleler", { ilceKodu });

const getCaddeSokaklar = (mahalleKodu) =>
  client.get(endpoint + "/sokaklar", { mahalleKodu });

const getAyarlar = (ayar) => client.get(endpoint + "/ayarlar", { ayar });

const getBasvuruTipi = () => client.get(endpoint + "/basvuruTipi");
const getBasvurular = () => client.get(endpoint + "/basvuru");
const getBasvuruDetay = (id) => client.get(endpoint + "/basvuru/" + id);
const basvuruNotEkle = (basvuruNo, eklenecekNot) =>
  client.post(endpoint + "/basvuruNotEkle", {
    basvuruNo,
    eklenecekNot,
  });
export const createBasvuru = (basvuru, onUploadProgress) => {
  return client.post(endpoint + "/basvuru", basvuru, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const getBeyanlar = () => client.get(endpoint + "/beyanlar");
const geteBeyanlar = () => client.get(endpoint + "/eBeyanlar");
const getTasinmazBeyanlar = () =>
  client.get(endpoint + "/tasinmazBeyanBilgisi");
const getInsaatTuru = () => client.get(endpoint + "/insaatTuru");
const getInsaatSinifi = () => client.get(endpoint + "/insaatSinifi");
const getInsaatKullanimSekli = () =>
  client.get(endpoint + "/insaatKullanimSekli");
const getCTVKullanimAmaci = () => client.get(endpoint + "/CTVKullanimAmaci");
const getIlanReklamTur = () => client.get(endpoint + "/ilanReklamTur");
const getIlanReklamYer = () => client.get(endpoint + "/ilanReklamYer");
const getTahsilatlar = (tahsilatYili) =>
  client.get(endpoint + "/tahsilatlar", { tahsilatYili });
const getTahsilatDekont = (tahsilatNo) =>
  client.get(endpoint + "/tahsilatDekont", { tahsilatNo });

const getRayicBelge = (beyanNo, belgeninVerilecegiKurum) =>
  client.get(endpoint + "/emlakRayicBelge", {
    beyanNo,
    belgeninVerilecegiKurum,
  });

export const createBinaBildirim = (bildirim, onUploadProgress) => {
  return client.post(endpoint + "/eBeyanlar/bina", bildirim, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const createArsaBildirim = (bildirim, onUploadProgress) => {
  return client.post(endpoint + "/eBeyanlar/arsa", bildirim, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const createCevreBildirim = (bildirim, onUploadProgress) => {
  return client.post(endpoint + "/eBeyanlar/cevreTemizlik", bildirim, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const createIlanBildirim = (bildirim, onUploadProgress) => {
  return client.post(endpoint + "/eBeyanlar/ilanReklam", bildirim, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getArsaRayicBedel,
  getCopToplamaBilgisi,
  getFaaliyetler,
  getHizmetler,
  getAskidaImarPlanlari,
  getBorclar,
  getEncumenGundemler,
  getEncumenKararlari,
  getEncumenKararTarih,
  getBarkodluBelgeDogrula,
  getImarBilgisi,
  getMeclisGundemler,
  getMeclisKararlari,
  getMeclisKararTarih,
  getNikahSalonlari,
  getNikahSalonDurum,
  getNobetciEczaneler,
  getIhaleler,
  getIlceler,
  getMahalleler,
  getCaddeSokaklar,
  getMudurlukler,
  getAyarlar,
  createEnrollment,
  getBasvuruTipi,
  createBasvuru,
  getBasvurular,
  getBasvuruDetay,
  basvuruNotEkle,
  getBeyanlar,
  geteBeyanlar,
  getTasinmazBeyanlar,
  createBinaBildirim,
  createArsaBildirim,
  createCevreBildirim,
  createIlanBildirim,
  getInsaatTuru,
  getInsaatSinifi,
  getInsaatKullanimSekli,
  getCTVKullanimAmaci,
  getIlanReklamTur,
  getIlanReklamYer,
  getRayicBelge,
  getMakbuz,
  getTahsilatlar,
  getTahsilatDekont,
  evrakDogrula,
  evrakIndir,
};
