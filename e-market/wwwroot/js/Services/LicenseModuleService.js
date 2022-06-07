/// <reference path="../model/licensemodulemodel/moduldetaykayitmodel.ts" />
/// <reference path="../model/licensemodulemodel/lisansdetaykayitmodel.ts" />
/// <reference path="../model/licensemodulemodel/kurumlisansdetaykayitmodel.ts" />
class LicenseModuleService extends kendo.data.ObservableObject {
    constructor(value) {
        super(value);
        this.moduleData = new ModulDetayKayitModel({
            TabloID: 0,
            Name: "",
            ModulDetayId: 0,
            SayfaId: []
        });
        this.licenseData = new LisansDetayKayitModel({
            TabloID: 0,
            Name: "",
            LisansDetayId: 0,
            ModulId: [],
            GecerliOlduguGun: 0,
            LisansZamanlariId: 0
        });
        this.companyLicenseData = new KurumLisansDetayKayitModel({
            TabloID: 0,
            Name: "",
            KurumLisansDetayId: 0,
            SonKullanimTarihi: "",
            KurumLisansId: 0,
            SayfaId: 0
        });
        super.init(this);
        this._repository = new Repository(ServiceConfiguration.CreateDefault("/LicenseModule"));
    }
}
