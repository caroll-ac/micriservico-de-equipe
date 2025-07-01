/*
  Warnings:

  - Added the required column `cod_pessoa_ref` to the `tref_pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tp_equipe_dsc_nome_key";

-- AlterTable
ALTER TABLE "tp_equipe" ALTER COLUMN "cod_usuario_criacao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tr_membro_equipe" ALTER COLUMN "cod_usuario_criacao" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tref_pessoa" ADD COLUMN     "cod_pessoa_ref" INTEGER NOT NULL;
