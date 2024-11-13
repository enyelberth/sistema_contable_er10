import { ApiProperty } from "@nestjs/swagger";

export class CreateAccessLevelDto {
  @ApiProperty({
    description: "recibe el codigo de rol al que se le asignaran los permisos",
    example: "RLU-00000",
  })
  role_code: string;
  @ApiProperty({
    description:
      "a su vez recibe el codigo del modulo al que se le dara los distintos tipos de permisos",
      example:  [{
          module_code: "MDL-00000",
        view: true,
        create: true,
        update:true,
        delete: true,
        print: true,
        report: true,
      }],
    },
  )
  modules: Array<{
    module_code: string;
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    print: boolean;
    report: boolean;
  }>;
}
