-- CreateEnum
CREATE TYPE "type" AS ENUM ('Gasto', 'Ganancias');

-- AlterTable
ALTER TABLE "Categorias" ADD COLUMN     "type" "type" NOT NULL DEFAULT 'Ganancias';
