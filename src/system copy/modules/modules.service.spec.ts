import { Test, TestingModule } from "@nestjs/testing";
import { ModulesService } from "./modules.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Modules } from "./entities/module.entity";

describe('modulesService', () => {
    let service: ModulesService
    let modulesRepository: Repository<Modules>
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            ModulesService,
            {
                provide: getRepositoryToken(Modules),
                useValue: {
                    createModule: jest.fn(),
                    getModules: jest.fn(),
                    getModule: jest.fn(),
                    updateModules: jest.fn()
                }
            }
        ],
        }).compile();
        service = module.get<ModulesService>(ModulesService);
    });

    it('Servicios de modulos', async () => {
        expect(service).toBeDefined();
    })
})