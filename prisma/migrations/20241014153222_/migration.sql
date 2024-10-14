-- AlterTable
ALTER TABLE "Categorias" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Gasto" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GastoFijo" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "IngresoFijos" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Ingresos" ALTER COLUMN "fecha" SET DEFAULT CURRENT_TIMESTAMP;