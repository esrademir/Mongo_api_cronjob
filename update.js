const cheerio = require("cheerio");
const fetch = require("node-fetch");
const slugify = require("slugify");
var CronJob = require('cron').CronJob;

var MONGO_CONN_URL =
    "mongodb+srv://bozkitoski_admin:rZTVYHSDDbngOcnL@burclarbozki.lof87jj.mongodb.net/?retryWrites=true&w=majority";



var MongoClient = require('mongodb').MongoClient;
var url = MONGO_CONN_URL;

API_URI_1 = "https://www.hurriyet.com.tr/mahmure/astroloji/{0}-burcu/"
API_URI_2 = "https://www.hurriyet.com.tr/mahmure/astroloji/{0}-burcu-{1}-yorum/"
API_URI_3 = "https://www.hurriyet.com.tr/mahmure/astroloji/burclar/{0}-burcu/{1}"

var datas1 = [];
var datas2 = [];
var datas3 = [];
var datas4 = [];
var datas5 = [];
var datas6 = [];
var datas7 = [];
var datas8 = [];
var datas9 = [];
var datas10 = [];

//Koç Değişkenler
//#region
var kocBurc = "Koc";
var kocAylikData;
var kocGunlukData;
var kocHaftalikData;

var kocAskDataYorum;
var kocAskDataBaslik;

var kocDiyetDataYorum;
var kocDiyetDataBaslik;

var kocKariyerDataYorum;
var kocKariyerDataBaslik;

var kocOlumluYonDataYorum;
var kocOlumluYonDataBaslik;

var kocOlumsuzYonDataYorum;
var kocOlumsuzYonDataBaslik;

var kocSaglikDataYorum;
var kocSaglikDataBaslik;

var kocStilDataYorum;
var kocStilDataBaslik;


//#endregion

//Boğa Değişkenler
//#region
var bogaBurc = "boga";
var bogaAylikData;
var bogaGunlukData;
var bogaHaftalikData;

var bogaAskDataYorum;
var bogaAskDataBaslik;

var bogaDiyetDataYorum;
var bogaDiyetDataBaslik;

var bogaKariyerDataYorum;
var bogaKariyerDataBaslik;

var bogaOlumluYonDataYorum;
var bogaOlumluYonDataBaslik;

var bogaOlumsuzYonDataYorum;
var bogaOlumsuzYonDataBaslik;

var bogaSaglikDataYorum;
var bogaSaglikDataBaslik;

var bogaStilDataYorum;
var bogaStilDataBaslik;

//#endregion

//İkizler Değişkenler
//#region
var ikizlerBurc = "ikizler";
var ikizlerAylikData;
var ikizlerGunlukData;
var ikizlerHaftalikData;

var ikizlerAskDataYorum;
var ikizlerAskDataBaslik;

var ikizlerDiyetDataYorum;
var ikizlerDiyetDataBaslik;

var ikizlerKariyerDataYorum;
var ikizlerKariyerDataBaslik;

var ikizlerOlumluYonDataYorum;
var ikizlerOlumluYonDataBaslik;

var ikizlerOlumsuzYonDataYorum;
var ikizlerOlumsuzYonDataBaslik;

var ikizlerSaglikDataYorum;
var ikizlerSaglikDataBaslik;

var ikizlerStilDataYorum;
var ikizlerStilDataBaslik;
//#endregion

//Yengeç Değişkenler
//#region
var yengecBurc = "yengec";
var yengecAylikData;
var yengecGunlukData;
var yengecHaftalikData;

var yengecAskDataYorum;
var yengecAskDataBaslik;

var yengecDiyetDataYorum;
var yengecDiyetDataBaslik;

var yengecKariyerDataYorum;
var yengecKariyerDataBaslik;

var yengecOlumluYonDataYorum;
var yengecOlumluYonDataBaslik;

var yengecOlumsuzYonDataYorum;
var yengecOlumsuzYonDataBaslik;

var yengecSaglikDataYorum;
var yengecSaglikDataBaslik;

var yengecStilDataYorum;
var yengecStilDataBaslik;
//#endregion

//Aslan Değişkenler
//#region
var aslanBurc = "aslan";
var aslanAylikData;
var aslanGunlukData;
var aslanHaftalikData;

var aslanAskDataYorum;
var aslanAskDataBaslik;

var aslanDiyetDataYorum;
var aslanDiyetDataBaslik;

var aslanKariyerDataYorum;
var aslanKariyerDataBaslik;

var aslanOlumluYonDataYorum;
var aslanOlumluYonDataBaslik;

var aslanOlumsuzYonDataYorum;
var aslanOlumsuzYonDataBaslik;

var aslanSaglikDataYorum;
var aslanSaglikDataBaslik;

var aslanStilDataYorum;
var aslanStilDataBaslik;
//#endregion

//Başak Değişkenler
//#region
var basakBurc = "basak";
var basakAylikData;
var basakGunlukData;
var basakHaftalikData;

var basakAskDataYorum;
var basakAskDataBaslik;

var basakDiyetDataYorum;
var basakDiyetDataBaslik;

var basakKariyerDataYorum;
var basakKariyerDataBaslik;

var basakOlumluYonDataYorum;
var basakOlumluYonDataBaslik;

var basakOlumsuzYonDataYorum;
var basakOlumsuzYonDataBaslik;

var basakSaglikDataYorum;
var basakSaglikDataBaslik;

var basakStilDataYorum;
var basakStilDataBaslik;
//#endregion

//Terazi Değişkenler
//#region
var teraziBurc = "terazi";
var teraziAylikData;
var teraziGunlukData;
var teraziHaftalikData;

var teraziAskDataYorum;
var teraziAskDataBaslik;

var teraziDiyetDataYorum;
var teraziDiyetDataBaslik;

var teraziKariyerDataYorum;
var teraziKariyerDataBaslik;

var teraziOlumluYonDataYorum;
var teraziOlumluYonDataBaslik;

var teraziOlumsuzYonDataYorum;
var teraziOlumsuzYonDataBaslik;

var teraziSaglikDataYorum;
var teraziSaglikDataBaslik;

var teraziStilDataYorum;
var teraziStilDataBaslik;
//#endregion

//Akrep Değişkenler
//#region
var akrepBurc = "akrep";
var akrepAylikData;
var akrepGunlukData;
var akrepHaftalikData;

var akrepAskDataYorum;
var akrepAskDataBaslik;

var akrepDiyetDataYorum;
var akrepDiyetDataBaslik;

var akrepKariyerDataYorum;
var akrepKariyerDataBaslik;

var akrepOlumluYonDataYorum;
var akrepOlumluYonDataBaslik;

var akrepOlumsuzYonDataYorum;
var akrepOlumsuzYonDataBaslik;

var akrepSaglikDataYorum;
var akrepSaglikDataBaslik;

var akrepStilDataYorum;
var akrepStilDataBaslik;
//#endregion

//Yay Değişkenler
//#region
var yayBurc = "yay";
var yayAylikData;
var yayGunlukData;
var yayHaftalikData;

var yayAskDataYorum;
var yayAskDataBaslik;

var yayDiyetDataYorum;
var yayDiyetDataBaslik;

var yayKariyerDataYorum;
var yayKariyerDataBaslik;

var yayOlumluYonDataYorum;
var yayOlumluYonDataBaslik;

var yayOlumsuzYonDataYorum;
var yayOlumsuzYonDataBaslik;

var yaySaglikDataYorum;
var yaySaglikDataBaslik;

var yayStilDataYorum;
var yayStilDataBaslik;
//#endregion

//Oglak Değişkenler
//#region
var oglakBurc = "oglak";
var oglakAylikData;
var oglakGunlukData;
var oglakHaftalikData;

var oglakAskDataYorum;
var oglakAskDataBaslik;

var oglakDiyetDataYorum;
var oglakDiyetDataBaslik;

var oglakKariyerDataYorum;
var oglakKariyerDataBaslik;

var oglakOlumluYonDataYorum;
var oglakOlumluYonDataBaslik;

var oglakOlumsuzYonDataYorum;
var oglakOlumsuzYonDataBaslik;

var oglakSaglikDataYorum;
var oglakSaglikDataBaslik;

var oglakStilDataYorum;
var oglakStilDataBaslik;
//#endregion

//Kova Değişkenler
//#region
var kovaBurc = "kova";
var kovaAylikData;
var kovaGunlukData;
var kovaHaftalikData;

var kovaAskDataYorum;
var kovaAskDataBaslik;

var kovaDiyetDataYorum;
var kovaDiyetDataBaslik;

var kovaKariyerDataYorum;
var kovaKariyerDataBaslik;

var kovaOlumluYonDataYorum;
var kovaOlumluYonDataBaslik;

var kovaOlumsuzYonDataYorum;
var kovaOlumsuzYonDataBaslik;

var kovaSaglikDataYorum;
var kovaSaglikDataBaslik;

var kovaStilDataYorum;
var kovaStilDataBaslik;
//#endregion

//Balık Değişkenler
//#region
var balikBurc = "balik";
var balikAylikData;
var balikGunlukData;
var balikHaftalikData;

var balikAskDataYorum;
var balikAskDataBaslik;

var balikDiyetDataYorum;
var balikDiyetDataBaslik;

var balikKariyerDataYorum;
var balikKariyerDataBaslik;

var balikOlumluYonDataYorum;
var balikOlumluYonDataBaslik;

var balikOlumsuzYonDataYorum;
var balikOlumsuzYonDataBaslik;

var balikSaglikDataYorum;
var balikSaglikDataBaslik;

var balikStilDataYorum;
var balikStilDataBaslik;
//#endregion

//Koç Fonksiyonlar
//#region
async function kocBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(kocBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            kocGunlukData = datas1[0]["GunlukYorum"];
            if (kocGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "kocGunluk": kocGunlukData,
                        }
                    };
                    dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("Koç burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Koç Günlük Patates");
            }

        })
}
async function kocBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    kocHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocHaftalik": kocHaftalikData,
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function kocBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    kocAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocAylik": kocAylikData,
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function kocBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    kocAskDataYorum = datas4[0]["Yorum"];
    kocAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocAskYorum": kocAskDataYorum,
                "kocAskBaslik": kocAskDataBaslik
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function kocBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    kocDiyetDataYorum = datas5[0]["Yorum"];
    kocDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocDiyetYorum": kocDiyetDataYorum,
                "kocDiyetBaslik": kocDiyetDataBaslik
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function kocBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    kocKariyerDataYorum = datas6[0]["Yorum"];
    kocKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocKariyerYorum": kocKariyerDataYorum,
                "kocKariyerBaslik": kocKariyerDataBaslik
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function kocBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kocOlumluYonDataYorum = datas7[0]["Yorum"];
    kocOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocOlumluYonYorum": kocOlumluYonDataYorum,
                "kocOlumluYonBaslik": kocOlumluYonDataBaslik
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function kocBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kocOlumsuzYonDataYorum = datas8[0]["Yorum"];
    kocOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocOlumsuzYonYorum": kocOlumsuzYonDataYorum,
                "kocOlumsuzYonBaslik": kocOlumsuzYonDataBaslik
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function kocBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kocSaglikDataYorum = datas9[0]["Yorum"];
    kocSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocSaglikYorum": kocSaglikDataYorum,
                "kocSaglikBaslik": kocSaglikDataBaslik
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function kocBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kocBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: kocBurc.charAt(0).toUpperCase() + kocBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kocStilDataYorum = datas10[0]["Yorum"];
    kocStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kocStilYorum": kocStilDataYorum,
                "kocStilBaslik": kocStilDataBaslik
            }
        };
        dbo.collection("kocBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("Koç burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//Boğa Fonksiyonlar
//#region
async function bogaBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(bogaBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })

            bogaGunlukData = datas1[0]["GunlukYorum"];
            if (bogaGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "bogaGunluk": bogaGunlukData,
                        }
                    };
                    dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("boğa burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Boğa günlük patates");
            }
        })
}
async function bogaBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    bogaHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaHaftalik": bogaHaftalikData,
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function bogaBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    bogaAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaAylik": bogaAylikData,
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function bogaBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    bogaAskDataYorum = datas4[0]["Yorum"];
    bogaAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaAskYorum": bogaAskDataYorum,
                "bogaAskBaslik": bogaAskDataBaslik
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function bogaBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    bogaDiyetDataYorum = datas5[0]["Yorum"];
    bogaDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaDiyetYorum": bogaDiyetDataYorum,
                "bogaDiyetBaslik": bogaDiyetDataBaslik
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function bogaBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    bogaKariyerDataYorum = datas6[0]["Yorum"];
    bogaKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaKariyerYorum": bogaKariyerDataYorum,
                "bogaKariyerBaslik": bogaKariyerDataBaslik
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function bogaBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    bogaOlumluYonDataYorum = datas7[0]["Yorum"];
    bogaOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaOlumluYonYorum": bogaOlumluYonDataYorum,
                "bogaOlumluYonBaslik": bogaOlumluYonDataBaslik
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function bogaBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    bogaOlumsuzYonDataYorum = datas8[0]["Yorum"];
    bogaOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaOlumsuzYonYorum": bogaOlumsuzYonDataYorum,
                "bogaOlumsuzYonBaslik": bogaOlumsuzYonDataBaslik
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function bogaBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    bogaSaglikDataYorum = datas9[0]["Yorum"];
    bogaSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaSaglikYorum": bogaSaglikDataYorum,
                "bogaSaglikBaslik": bogaSaglikDataBaslik
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function bogaBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(bogaBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: bogaBurc.charAt(0).toUpperCase() + bogaBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    bogaStilDataYorum = datas10[0]["Yorum"];
    bogaStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "bogaStilYorum": bogaStilDataYorum,
                "bogaStilBaslik": bogaStilDataBaslik
            }
        };
        dbo.collection("bogaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("boğa burcu stil yorum güncellendi.");
            datas10 = [];
            db.close();
        });
    });



    console.log("Data temizlendi");
}
//#endregion

//ikizler Fonksiyonlar
//#region
async function ikizlerBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(ikizlerBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            ikizlerGunlukData = datas1[0]["GunlukYorum"];
            if (ikizlerGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "ikizlerGunluk": ikizlerGunlukData,
                        }
                    };
                    dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("ikizler burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });

            }
            else {
                console.log("İkizler günlük patates");
            }

        })
}
async function ikizlerBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    ikizlerHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerHaftalik": ikizlerHaftalikData,
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function ikizlerBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    ikizlerAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerAylik": ikizlerAylikData,
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function ikizlerBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    ikizlerAskDataYorum = datas4[0]["Yorum"];
    ikizlerAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerAskYorum": ikizlerAskDataYorum,
                "ikizlerAskBaslik": ikizlerAskDataBaslik
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function ikizlerBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    ikizlerDiyetDataYorum = datas5[0]["Yorum"];
    ikizlerDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerDiyetYorum": ikizlerDiyetDataYorum,
                "ikizlerDiyetBaslik": ikizlerDiyetDataBaslik
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function ikizlerBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    ikizlerKariyerDataYorum = datas6[0]["Yorum"];
    ikizlerKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerKariyerYorum": ikizlerKariyerDataYorum,
                "ikizlerKariyerBaslik": ikizlerKariyerDataBaslik
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function ikizlerBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    ikizlerOlumluYonDataYorum = datas7[0]["Yorum"];
    ikizlerOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerOlumluYonYorum": ikizlerOlumluYonDataYorum,
                "ikizlerOlumluYonBaslik": ikizlerOlumluYonDataBaslik
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function ikizlerBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    ikizlerOlumsuzYonDataYorum = datas8[0]["Yorum"];
    ikizlerOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerOlumsuzYonYorum": ikizlerOlumsuzYonDataYorum,
                "ikizlerOlumsuzYonBaslik": ikizlerOlumsuzYonDataBaslik
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function ikizlerBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    ikizlerSaglikDataYorum = datas9[0]["Yorum"];
    ikizlerSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerSaglikYorum": ikizlerSaglikDataYorum,
                "ikizlerSaglikBaslik": ikizlerSaglikDataBaslik
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function ikizlerBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(ikizlerBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: ikizlerBurc.charAt(0).toUpperCase() + ikizlerBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    ikizlerStilDataYorum = datas10[0]["Yorum"];
    ikizlerStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "ikizlerStilYorum": ikizlerStilDataYorum,
                "ikizlerStilBaslik": ikizlerStilDataBaslik
            }
        };
        dbo.collection("ikizlerBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("ikizler burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//yengec Fonksiyonlar
//#region
async function yengecBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(yengecBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            yengecGunlukData = datas1[0]["GunlukYorum"];
            if (yengecGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "yengecGunluk": yengecGunlukData,
                        }
                    };
                    dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("yengec burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Yengeç günlük patates");
            }
        })
}
async function yengecBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    yengecHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecHaftalik": yengecHaftalikData,
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function yengecBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    yengecAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecAylik": yengecAylikData,
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function yengecBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    yengecAskDataYorum = datas4[0]["Yorum"];
    yengecAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecAskYorum": yengecAskDataYorum,
                "yengecAskBaslik": yengecAskDataBaslik
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function yengecBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    yengecDiyetDataYorum = datas5[0]["Yorum"];
    yengecDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecDiyetYorum": yengecDiyetDataYorum,
                "yengecDiyetBaslik": yengecDiyetDataBaslik
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function yengecBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    yengecKariyerDataYorum = datas6[0]["Yorum"];
    yengecKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecKariyerYorum": yengecKariyerDataYorum,
                "yengecKariyerBaslik": yengecKariyerDataBaslik
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function yengecBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yengecOlumluYonDataYorum = datas7[0]["Yorum"];
    yengecOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecOlumluYonYorum": yengecOlumluYonDataYorum,
                "yengecOlumluYonBaslik": yengecOlumluYonDataBaslik
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function yengecBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yengecOlumsuzYonDataYorum = datas8[0]["Yorum"];
    yengecOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecOlumsuzYonYorum": yengecOlumsuzYonDataYorum,
                "yengecOlumsuzYonBaslik": yengecOlumsuzYonDataBaslik
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function yengecBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yengecSaglikDataYorum = datas9[0]["Yorum"];
    yengecSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecSaglikYorum": yengecSaglikDataYorum,
                "yengecSaglikBaslik": yengecSaglikDataBaslik
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function yengecBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yengecBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: yengecBurc.charAt(0).toUpperCase() + yengecBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yengecStilDataYorum = datas10[0]["Yorum"];
    yengecStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yengecStilYorum": yengecStilDataYorum,
                "yengecStilBaslik": yengecStilDataBaslik
            }
        };
        dbo.collection("yengecBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yengec burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//aslan Fonksiyonlar
//#region
async function aslanBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(aslanBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            aslanGunlukData = datas1[0]["GunlukYorum"];
            if (aslanGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "aslanGunluk": aslanGunlukData,
                        }
                    };
                    dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("aslan burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Aslan günlük patates");
            }
        })
}
async function aslanBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    aslanHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanHaftalik": aslanHaftalikData,
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function aslanBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    aslanAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanAylik": aslanAylikData,
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function aslanBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    aslanAskDataYorum = datas4[0]["Yorum"];
    aslanAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanAskYorum": aslanAskDataYorum,
                "aslanAskBaslik": aslanAskDataBaslik
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function aslanBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    aslanDiyetDataYorum = datas5[0]["Yorum"];
    aslanDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanDiyetYorum": aslanDiyetDataYorum,
                "aslanDiyetBaslik": aslanDiyetDataBaslik
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function aslanBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    aslanKariyerDataYorum = datas6[0]["Yorum"];
    aslanKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanKariyerYorum": aslanKariyerDataYorum,
                "aslanKariyerBaslik": aslanKariyerDataBaslik
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function aslanBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    aslanOlumluYonDataYorum = datas7[0]["Yorum"];
    aslanOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanOlumluYonYorum": aslanOlumluYonDataYorum,
                "aslanOlumluYonBaslik": aslanOlumluYonDataBaslik
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function aslanBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    aslanOlumsuzYonDataYorum = datas8[0]["Yorum"];
    aslanOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanOlumsuzYonYorum": aslanOlumsuzYonDataYorum,
                "aslanOlumsuzYonBaslik": aslanOlumsuzYonDataBaslik
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function aslanBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    aslanSaglikDataYorum = datas9[0]["Yorum"];
    aslanSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanSaglikYorum": aslanSaglikDataYorum,
                "aslanSaglikBaslik": aslanSaglikDataBaslik
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function aslanBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(aslanBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: aslanBurc.charAt(0).toUpperCase() + aslanBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    aslanStilDataYorum = datas10[0]["Yorum"];
    aslanStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "aslanStilYorum": aslanStilDataYorum,
                "aslanStilBaslik": aslanStilDataBaslik
            }
        };
        dbo.collection("aslanBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("aslan burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//basak Fonksiyonlar
//#region
async function basakBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(basakBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            basakGunlukData = datas1[0]["GunlukYorum"];
            if (basakGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "basakGunluk": basakGunlukData,
                        }
                    };
                    dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("basak burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Basaşk günlük patates");
            }
        })
}
async function basakBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    basakHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakHaftalik": basakHaftalikData,
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function basakBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    basakAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakAylik": basakAylikData,
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function basakBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    basakAskDataYorum = datas4[0]["Yorum"];
    basakAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakAskYorum": basakAskDataYorum,
                "basakAskBaslik": basakAskDataBaslik
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function basakBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    basakDiyetDataYorum = datas5[0]["Yorum"];
    basakDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakDiyetYorum": basakDiyetDataYorum,
                "basakDiyetBaslik": basakDiyetDataBaslik
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function basakBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    basakKariyerDataYorum = datas6[0]["Yorum"];
    basakKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakKariyerYorum": basakKariyerDataYorum,
                "basakKariyerBaslik": basakKariyerDataBaslik
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function basakBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    basakOlumluYonDataYorum = datas7[0]["Yorum"];
    basakOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakOlumluYonYorum": basakOlumluYonDataYorum,
                "basakOlumluYonBaslik": basakOlumluYonDataBaslik
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function basakBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    basakOlumsuzYonDataYorum = datas8[0]["Yorum"];
    basakOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakOlumsuzYonYorum": basakOlumsuzYonDataYorum,
                "basakOlumsuzYonBaslik": basakOlumsuzYonDataBaslik
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function basakBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    basakSaglikDataYorum = datas9[0]["Yorum"];
    basakSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakSaglikYorum": basakSaglikDataYorum,
                "basakSaglikBaslik": basakSaglikDataBaslik
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function basakBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(basakBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: basakBurc.charAt(0).toUpperCase() + basakBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    basakStilDataYorum = datas10[0]["Yorum"];
    basakStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "basakStilYorum": basakStilDataYorum,
                "basakStilBaslik": basakStilDataBaslik
            }
        };
        dbo.collection("basakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("basak burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//terazi Fonksiyonlar
//#region
async function teraziBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(teraziBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            teraziGunlukData = datas1[0]["GunlukYorum"];
            if (teraziGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "teraziGunluk": teraziGunlukData,
                        }
                    };
                    dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("terazi burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Terazi günlük patates");
            }

        })
}
async function teraziBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    teraziHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziHaftalik": teraziHaftalikData,
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function teraziBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    teraziAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziAylik": teraziAylikData,
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function teraziBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    teraziAskDataYorum = datas4[0]["Yorum"];
    teraziAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziAskYorum": teraziAskDataYorum,
                "teraziAskBaslik": teraziAskDataBaslik
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function teraziBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    teraziDiyetDataYorum = datas5[0]["Yorum"];
    teraziDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziDiyetYorum": teraziDiyetDataYorum,
                "teraziDiyetBaslik": teraziDiyetDataBaslik
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function teraziBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    teraziKariyerDataYorum = datas6[0]["Yorum"];
    teraziKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziKariyerYorum": teraziKariyerDataYorum,
                "teraziKariyerBaslik": teraziKariyerDataBaslik
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function teraziBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    teraziOlumluYonDataYorum = datas7[0]["Yorum"];
    teraziOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziOlumluYonYorum": teraziOlumluYonDataYorum,
                "teraziOlumluYonBaslik": teraziOlumluYonDataBaslik
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function teraziBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    teraziOlumsuzYonDataYorum = datas8[0]["Yorum"];
    teraziOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziOlumsuzYonYorum": teraziOlumsuzYonDataYorum,
                "teraziOlumsuzYonBaslik": teraziOlumsuzYonDataBaslik
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function teraziBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    teraziSaglikDataYorum = datas9[0]["Yorum"];
    teraziSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziSaglikYorum": teraziSaglikDataYorum,
                "teraziSaglikBaslik": teraziSaglikDataBaslik
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function teraziBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(teraziBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: teraziBurc.charAt(0).toUpperCase() + teraziBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    teraziStilDataYorum = datas10[0]["Yorum"];
    teraziStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "teraziStilYorum": teraziStilDataYorum,
                "teraziStilBaslik": teraziStilDataBaslik
            }
        };
        dbo.collection("teraziBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("terazi burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//akrep Fonksiyonlar
//#region
async function akrepBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(akrepBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            akrepGunlukData = datas1[0]["GunlukYorum"];
            if (akrepGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "akrepGunluk": akrepGunlukData,
                        }
                    };
                    dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("akrep burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Akrep günlük patates");
            }

        })
}
async function akrepBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    akrepHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepHaftalik": akrepHaftalikData,
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function akrepBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    akrepAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepAylik": akrepAylikData,
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function akrepBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    akrepAskDataYorum = datas4[0]["Yorum"];
    akrepAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepAskYorum": akrepAskDataYorum,
                "akrepAskBaslik": akrepAskDataBaslik
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function akrepBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    akrepDiyetDataYorum = datas5[0]["Yorum"];
    akrepDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepDiyetYorum": akrepDiyetDataYorum,
                "akrepDiyetBaslik": akrepDiyetDataBaslik
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function akrepBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    akrepKariyerDataYorum = datas6[0]["Yorum"];
    akrepKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepKariyerYorum": akrepKariyerDataYorum,
                "akrepKariyerBaslik": akrepKariyerDataBaslik
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function akrepBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    akrepOlumluYonDataYorum = datas7[0]["Yorum"];
    akrepOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepOlumluYonYorum": akrepOlumluYonDataYorum,
                "akrepOlumluYonBaslik": akrepOlumluYonDataBaslik
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function akrepBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    akrepOlumsuzYonDataYorum = datas8[0]["Yorum"];
    akrepOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepOlumsuzYonYorum": akrepOlumsuzYonDataYorum,
                "akrepOlumsuzYonBaslik": akrepOlumsuzYonDataBaslik
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function akrepBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    akrepSaglikDataYorum = datas9[0]["Yorum"];
    akrepSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepSaglikYorum": akrepSaglikDataYorum,
                "akrepSaglikBaslik": akrepSaglikDataBaslik
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function akrepBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(akrepBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: akrepBurc.charAt(0).toUpperCase() + akrepBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    akrepStilDataYorum = datas10[0]["Yorum"];
    akrepStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "akrepStilYorum": akrepStilDataYorum,
                "akrepStilBaslik": akrepStilDataBaslik
            }
        };
        dbo.collection("akrepBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("akrep burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//yay Fonksiyonlar
//#region
async function yayBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(yayBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            yayGunlukData = datas1[0]["GunlukYorum"];
            if (yayGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "yayGunluk": yayGunlukData,
                        }
                    };
                    dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("yay burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Yay günlük patates");
            }

        })
}
async function yayBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    yayHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayHaftalik": yayHaftalikData,
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function yayBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    yayAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayAylik": yayAylikData,
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function yayBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    yayAskDataYorum = datas4[0]["Yorum"];
    yayAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayAskYorum": yayAskDataYorum,
                "yayAskBaslik": yayAskDataBaslik
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function yayBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    yayDiyetDataYorum = datas5[0]["Yorum"];
    yayDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayDiyetYorum": yayDiyetDataYorum,
                "yayDiyetBaslik": yayDiyetDataBaslik
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function yayBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    yayKariyerDataYorum = datas6[0]["Yorum"];
    yayKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayKariyerYorum": yayKariyerDataYorum,
                "yayKariyerBaslik": yayKariyerDataBaslik
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function yayBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yayOlumluYonDataYorum = datas7[0]["Yorum"];
    yayOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayOlumluYonYorum": yayOlumluYonDataYorum,
                "yayOlumluYonBaslik": yayOlumluYonDataBaslik
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function yayBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yayOlumsuzYonDataYorum = datas8[0]["Yorum"];
    yayOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayOlumsuzYonYorum": yayOlumsuzYonDataYorum,
                "yayOlumsuzYonBaslik": yayOlumsuzYonDataBaslik
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function yayBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yaySaglikDataYorum = datas9[0]["Yorum"];
    yaySaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yaySaglikYorum": yaySaglikDataYorum,
                "yaySaglikBaslik": yaySaglikDataBaslik
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function yayBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(yayBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: yayBurc.charAt(0).toUpperCase() + yayBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    yayStilDataYorum = datas10[0]["Yorum"];
    yayStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "yayStilYorum": yayStilDataYorum,
                "yayStilBaslik": yayStilDataBaslik
            }
        };
        dbo.collection("yayBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("yay burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//oglak Fonksiyonlar
//#region
async function oglakBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(oglakBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            oglakGunlukData = datas1[0]["GunlukYorum"];
            if (oglakGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "oglakGunluk": oglakGunlukData,
                        }
                    };
                    dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("oglak burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Oğlak günlük patates");
            }

        })
}
async function oglakBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    oglakHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakHaftalik": oglakHaftalikData,
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function oglakBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    oglakAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakAylik": oglakAylikData,
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function oglakBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    oglakAskDataYorum = datas4[0]["Yorum"];
    oglakAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakAskYorum": oglakAskDataYorum,
                "oglakAskBaslik": oglakAskDataBaslik
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function oglakBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    oglakDiyetDataYorum = datas5[0]["Yorum"];
    oglakDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakDiyetYorum": oglakDiyetDataYorum,
                "oglakDiyetBaslik": oglakDiyetDataBaslik
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function oglakBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    oglakKariyerDataYorum = datas6[0]["Yorum"];
    oglakKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakKariyerYorum": oglakKariyerDataYorum,
                "oglakKariyerBaslik": oglakKariyerDataBaslik
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function oglakBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    oglakOlumluYonDataYorum = datas7[0]["Yorum"];
    oglakOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakOlumluYonYorum": oglakOlumluYonDataYorum,
                "oglakOlumluYonBaslik": oglakOlumluYonDataBaslik
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function oglakBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    oglakOlumsuzYonDataYorum = datas8[0]["Yorum"];
    oglakOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakOlumsuzYonYorum": oglakOlumsuzYonDataYorum,
                "oglakOlumsuzYonBaslik": oglakOlumsuzYonDataBaslik
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function oglakBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    oglakSaglikDataYorum = datas9[0]["Yorum"];
    oglakSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakSaglikYorum": oglakSaglikDataYorum,
                "oglakSaglikBaslik": oglakSaglikDataBaslik
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function oglakBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(oglakBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: oglakBurc.charAt(0).toUpperCase() + oglakBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    oglakStilDataYorum = datas10[0]["Yorum"];
    oglakStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "oglakStilYorum": oglakStilDataYorum,
                "oglakStilBaslik": oglakStilDataBaslik
            }
        };
        dbo.collection("oglakBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("oglak burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//kova Fonksiyonlar
//#region
async function kovaBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(kovaBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            kovaGunlukData = datas1[0]["GunlukYorum"];
            if (kovaGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "kovaGunluk": kovaGunlukData,
                        }
                    };
                    dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("kova burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Kova günlük patates");
            }

        })
}
async function kovaBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    kovaHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaHaftalik": kovaHaftalikData,
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function kovaBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    kovaAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaAylik": kovaAylikData,
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function kovaBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    kovaAskDataYorum = datas4[0]["Yorum"];
    kovaAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaAskYorum": kovaAskDataYorum,
                "kovaAskBaslik": kovaAskDataBaslik
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function kovaBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    kovaDiyetDataYorum = datas5[0]["Yorum"];
    kovaDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaDiyetYorum": kovaDiyetDataYorum,
                "kovaDiyetBaslik": kovaDiyetDataBaslik
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function kovaBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    kovaKariyerDataYorum = datas6[0]["Yorum"];
    kovaKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaKariyerYorum": kovaKariyerDataYorum,
                "kovaKariyerBaslik": kovaKariyerDataBaslik
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function kovaBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kovaOlumluYonDataYorum = datas7[0]["Yorum"];
    kovaOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaOlumluYonYorum": kovaOlumluYonDataYorum,
                "kovaOlumluYonBaslik": kovaOlumluYonDataBaslik
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function kovaBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kovaOlumsuzYonDataYorum = datas8[0]["Yorum"];
    kovaOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaOlumsuzYonYorum": kovaOlumsuzYonDataYorum,
                "kovaOlumsuzYonBaslik": kovaOlumsuzYonDataBaslik
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function kovaBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kovaSaglikDataYorum = datas9[0]["Yorum"];
    kovaSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaSaglikYorum": kovaSaglikDataYorum,
                "kovaSaglikBaslik": kovaSaglikDataBaslik
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function kovaBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(kovaBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: kovaBurc.charAt(0).toUpperCase() + kovaBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    kovaStilDataYorum = datas10[0]["Yorum"];
    kovaStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "kovaStilYorum": kovaStilDataYorum,
                "kovaStilBaslik": kovaStilDataBaslik
            }
        };
        dbo.collection("kovaBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("kova burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//balik Fonksiyonlar
//#region
async function balikBurcGunlukUp() {
    await fetch(API_URI_1.replace('{0}', slugify(balikBurc)))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas1[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    GunlukYorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
            balikGunlukData = datas1[0]["GunlukYorum"];
            if (balikGunlukData != "") {
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db("Burclarbozki");
                    var myquery = {

                    };
                    var newvalues = {
                        $set: {
                            "balikGunluk": balikGunlukData,
                        }
                    };
                    dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
                        if (err) throw err;
                        console.log("balik burcu günlük yorum güncellendi.");
                        datas1 = [];
                        db.close();
                    });
                });
            }
            else {
                console.log("Balık günlük patates");
            }

        })
}
async function balikBurcHaftalikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("haftalik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas2[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Zaman: "haftalik".charAt(0).toUpperCase() + "haftalik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    balikHaftalikData = datas2[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikHaftalik": balikHaftalikData,
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu haftalık yorum güncellendi.");

            datas2 = [];
            db.close();
        });
    });
}
async function balikBurcAylikUp() {
    await fetch(API_URI_2.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("aylik")))
        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('div[class=main-wrapper]').each(function (i, e) {
                datas3[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Zaman: "aylik".charAt(0).toUpperCase() + "aylik".slice(1),
                    Mottosu: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(0)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Gezegeni: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(1)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Elementi: $(this)
                        .find('div[class=page] div div .region-type-1.col-12 .row.mb20 div div div[class=horoscope-menu-detail] ul li ')
                        .slice(0)
                        .eq(2)
                        .text()
                        .match(/(.*):\s\s(.*)/)[2],
                    Yorum: $(this)
                        .find('div[class=page] div div .region-type-2.col-lg-8.col-md-12 div div div[class=horoscope-detail-content] div p')
                        .text()
                }
            })
        })
    balikAylikData = datas3[0]["Yorum"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikAylik": balikAylikData,
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu aylık yorum güncellendi.");

            datas3 = [];
            db.close();
        });
    });
}
async function balikBurcAskUp() {
    await fetch(API_URI_3.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("ask")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas4[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Ozellik: "ask".charAt(0).toUpperCase() + "ask".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    balikAskDataYorum = datas4[0]["Yorum"];
    balikAskDataBaslik = datas4[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikAskYorum": balikAskDataYorum,
                "balikAskBaslik": balikAskDataBaslik
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu aşk yorum güncellendi.");

            datas4 = [];
            db.close();
        });
    });
}
async function balikBurcDiyetUp() {
    await fetch(API_URI_3.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("diyet")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas5[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Ozellik: "diyet".charAt(0).toUpperCase() + "diyet".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    balikDiyetDataYorum = datas5[0]["Yorum"];
    balikDiyetDataBaslik = datas5[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikDiyetYorum": balikDiyetDataYorum,
                "balikDiyetBaslik": balikDiyetDataBaslik
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu diyet yorum güncellendi.");

            datas5 = [];
            db.close();
        });
    });
}
async function balikBurcKariyerUp() {
    await fetch(API_URI_3.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("kariyer")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas6[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Ozellik: "kariyer".charAt(0).toUpperCase() + "kariyer".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),

                }

            })

        })
    balikKariyerDataYorum = datas6[0]["Yorum"];
    balikKariyerDataBaslik = datas6[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikKariyerYorum": balikKariyerDataYorum,
                "balikKariyerBaslik": balikKariyerDataBaslik
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu kariyer yorum güncellendi.");

            datas6 = [];
            db.close();
        });
    });
}
async function balikBurcOlumluUp() {
    await fetch(API_URI_3.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("olumlu yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas7[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Ozellik: "olumlu%20yonler".charAt(0).toUpperCase() + "olumlu%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    balikOlumluYonDataYorum = datas7[0]["Yorum"];
    balikOlumluYonDataBaslik = datas7[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikOlumluYonYorum": balikOlumluYonDataYorum,
                "balikOlumluYonBaslik": balikOlumluYonDataBaslik
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu olumlu yön yorum güncellendi.");

            datas7 = [];
            db.close();
        });
    });
}
async function balikBurcOlumsuzUp() {
    await fetch(API_URI_3.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("olumsuz yonler")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas8[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Ozellik: "olumsuz%20yonler".charAt(0).toUpperCase() + "olumsuz%20yonler".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    balikOlumsuzYonDataYorum = datas8[0]["Yorum"];
    balikOlumsuzYonDataBaslik = datas8[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikOlumsuzYonYorum": balikOlumsuzYonDataYorum,
                "balikOlumsuzYonBaslik": balikOlumsuzYonDataBaslik
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu olumsuz yön yorum güncellendi.");

            datas8 = [];
            db.close();
        });
    });
}
async function balikBurcSaglikUp() {
    await fetch(API_URI_3.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("saglik")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas9[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Ozellik: "saglik".charAt(0).toUpperCase() + "saglik".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    balikSaglikDataYorum = datas9[0]["Yorum"];
    balikSaglikDataBaslik = datas9[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikSaglikYorum": balikSaglikDataYorum,
                "balikSaglikBaslik": balikSaglikDataBaslik
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu sağlık yorum güncellendi.");

            datas9 = [];
            db.close();
        });
    });
}
async function balikBurcStilUp() {
    await fetch(API_URI_3.replace('{0}', slugify(balikBurc)).replace('{1}', slugify("stil")))

        .then(response => response.text())
        .then(body => {
            const $ = cheerio.load(body)
            $('.col-md-12.col-lg-8').each(function (i, e) {
                datas10[i] = {
                    Burc: balikBurc.charAt(0).toUpperCase() + balikBurc.slice(1),
                    Ozellik: "stil".charAt(0).toUpperCase() + "stil".slice(1),
                    Baslik: $(this)
                        .find('div h2')
                        .text().match(/(.*)\"(.*)\.(.*)/)[2],
                    Yorum: $(this)
                        .find('div div p')
                        .text(),
                    Unluler: $(this)
                        .find('div div ul li')
                        .text(),
                }
            })
        })
    balikStilDataYorum = datas10[0]["Yorum"];
    balikStilDataBaslik = datas10[0]["Baslik"];
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Burclarbozki");
        var myquery = {

        };
        var newvalues = {
            $set: {
                "balikStilYorum": balikStilDataYorum,
                "balikStilBaslik": balikStilDataBaslik
            }
        };
        dbo.collection("balikBurc").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("balik burcu stil yorum güncellendi.");

            datas10 = [];
            db.close();
        });
    });

}
//#endregion

//crons
const kocjob = new CronJob('1 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    kocBurcGunlukUp();
    kocBurcHaftalikUp();
    kocBurcAylikUp();
    kocBurcAskUp();
    kocBurcDiyetUp();
    kocBurcKariyerUp();
    kocBurcOlumluUp();
    kocBurcOlumsuzUp();
    kocBurcSaglikUp();
    kocBurcStilUp();
});

const bogajob = new CronJob('5 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    bogaBurcGunlukUp();
    bogaBurcHaftalikUp();
    bogaBurcAylikUp();
    bogaBurcAskUp();
    bogaBurcDiyetUp();
    bogaBurcKariyerUp();
    bogaBurcOlumluUp();
    bogaBurcOlumsuzUp();
    bogaBurcSaglikUp();
    bogaBurcStilUp();
});

const ikizlerjob = new CronJob('10 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    ikizlerBurcGunlukUp();
    ikizlerBurcHaftalikUp();
    ikizlerBurcAylikUp();
    ikizlerBurcAskUp();
    ikizlerBurcDiyetUp();
    ikizlerBurcKariyerUp();
    ikizlerBurcOlumluUp();
    ikizlerBurcOlumsuzUp();
    ikizlerBurcSaglikUp();
    ikizlerBurcStilUp();
});

const yengecjob = new CronJob('15 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    yengecBurcGunlukUp();
    yengecBurcHaftalikUp();
    yengecBurcAylikUp();
    yengecBurcAskUp();
    yengecBurcDiyetUp();
    yengecBurcKariyerUp();
    yengecBurcOlumluUp();
    yengecBurcOlumsuzUp();
    yengecBurcSaglikUp();
    yengecBurcStilUp();
});

const aslanjob = new CronJob('20 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    aslanBurcGunlukUp();
    aslanBurcHaftalikUp();
    aslanBurcAylikUp();
    aslanBurcAskUp();
    aslanBurcDiyetUp();
    aslanBurcKariyerUp();
    aslanBurcOlumluUp();
    aslanBurcOlumsuzUp();
    aslanBurcSaglikUp();
    aslanBurcStilUp();
});

const basakjob = new CronJob('25 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    basakBurcGunlukUp();
    basakBurcHaftalikUp();
    basakBurcAylikUp();
    basakBurcAskUp();
    basakBurcDiyetUp();
    basakBurcKariyerUp();
    basakBurcOlumluUp();
    basakBurcOlumsuzUp();
    basakBurcSaglikUp();
    basakBurcStilUp();
});

const terazijob = new CronJob('30 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    teraziBurcGunlukUp();
    teraziBurcHaftalikUp();
    teraziBurcAylikUp();
    teraziBurcAskUp();
    teraziBurcDiyetUp();
    teraziBurcKariyerUp();
    teraziBurcOlumluUp();
    teraziBurcOlumsuzUp();
    teraziBurcSaglikUp();
    teraziBurcStilUp();
});

const akrepjob = new CronJob('35 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    akrepBurcGunlukUp();
    akrepBurcHaftalikUp();
    akrepBurcAylikUp();
    akrepBurcAskUp();
    akrepBurcDiyetUp();
    akrepBurcKariyerUp();
    akrepBurcOlumluUp();
    akrepBurcOlumsuzUp();
    akrepBurcSaglikUp();
    akrepBurcStilUp();
});

const yayjob = new CronJob('40 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    yayBurcGunlukUp();
    yayBurcHaftalikUp();
    yayBurcAylikUp();
    yayBurcAskUp();
    yayBurcDiyetUp();
    yayBurcKariyerUp();
    yayBurcOlumluUp();
    yayBurcOlumsuzUp();
    yayBurcSaglikUp();
    yayBurcStilUp();
});

const oglakjob = new CronJob('45 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    oglakBurcGunlukUp();
    oglakBurcHaftalikUp();
    oglakBurcAylikUp();
    oglakBurcAskUp();
    oglakBurcDiyetUp();
    oglakBurcKariyerUp();
    oglakBurcOlumluUp();
    oglakBurcOlumsuzUp();
    oglakBurcSaglikUp();
    oglakBurcStilUp();
});

const kovajob = new CronJob('50 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    kovaBurcGunlukUp();
    kovaBurcHaftalikUp();
    kovaBurcAylikUp();
    kovaBurcAskUp();
    kovaBurcDiyetUp();
    kovaBurcKariyerUp();
    kovaBurcOlumluUp();
    kovaBurcOlumsuzUp();
    kovaBurcSaglikUp();
    kovaBurcStilUp();
});

const balikjob = new CronJob('55 */1 * * *', function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    balikBurcGunlukUp();
    balikBurcHaftalikUp();
    balikBurcAylikUp();
    balikBurcAskUp();
    balikBurcDiyetUp();
    balikBurcKariyerUp();
    balikBurcOlumluUp();
    balikBurcOlumsuzUp();
    balikBurcSaglikUp();
    balikBurcStilUp();
});

console.log("Cronjoblar başladı.");
//crons
kocjob.start();
bogajob.start();
ikizlerjob.start();
yengecjob.start();
aslanjob.start();
basakjob.start();
terazijob.start();
akrepjob.start();
yayjob.start();
oglakjob.start();
kovajob.start();
balikjob.start();


