import { AddonDemoModule } from "../modules/addon-demo.module";

import { InjectionType } from "@notadd/core/constants/injection.constants";

export class AddonDemoInjection {
    static identification: string = "addon-demo";
    static module: any = AddonDemoModule;
    static type: string = InjectionType.Addon;
}
