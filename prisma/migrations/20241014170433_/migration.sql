/*
  Warnings:

  - The `type` column on the `Categorias` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Gasto', 'Ganancias');

-- DropIndex
DROP INDEX "Gasto_categoriaId_key";

-- DropIndex
DROP INDEX "GastoFijo_categoriaId_key";

-- DropIndex
DROP INDEX "IngresoFijos_categoriaId_key";

-- DropIndex
DROP INDEX "Ingresos_categoriaId_key";

-- AlterTable
ALTER TABLE "Categorias" DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Ganancias';

-- DropEnum
DROP TYPE "type";
