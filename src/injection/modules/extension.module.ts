import { ExtensionResolvers } from "../resolvers/extension.resolvers";
import { importClassesFromDirectories } from "../utilities";
import { InjectionMetadata } from "../metadatas/injection.metadata";
import { InjectionType } from "@notadd/core/constants/injection.constants";
import { Logger, Module } from "@nestjs/common";
import { OnModuleInitWithInjection } from "@notadd/core/interfaces/on-module-init-with-injection.interface";
import { SettingService } from "@notadd/setting/services/setting.service";
import { SettingModule } from "@notadd/setting/modules/setting.module";

@Module({
    components: [
        ExtensionResolvers,
    ],
    imports: [
        SettingModule,
    ],
})
export class ExtensionModule implements OnModuleInitWithInjection {
    private logger: Logger;

    /**
     * @param { SettingService } settingService
     */
    constructor(private readonly settingService: SettingService) {
        this.logger = new Logger("NotaddExtension", true);
    }

    /**
     * @returns { Promise<Array<InjectionMetadata>> }
     */
    async onModuleInitWithInjection(): Promise<Array<InjectionMetadata>> {
        const settings = await this.settingService.getSettings();

        return importClassesFromDirectories<Function>([ "**/*.injection.js" ])
            .filter(injection => {
                if (injection instanceof Function) {
                    return (<any> injection).identification.length
                        && (<any> injection).module
                        && (<any> injection).type.length
                        && (<any> injection).type == InjectionType.Extension;
                }

                return false;
            }).map(instance => {
                const metadata = new InjectionMetadata();
                metadata.identification = (<any> instance).identification;
                metadata.module = (<any> instance).module;
                metadata.type = (<any> instance).type;

                return metadata;
            });
    }
}
