/*
  Warnings:

  - Added the required column `cod_usuario_criacao` to the `tr_membro_equipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dat_atualizacao` to the `tr_membro_equipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tr_membro_equipe" ADD COLUMN     "cod_usuario_criacao" INTEGER NOT NULL,
ADD COLUMN     "cod_usuario_delete" INTEGER,
ADD COLUMN     "cod_usuario_update" INTEGER,
ADD COLUMN     "dat_atualizacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dat_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dat_delete" TIMESTAMP(3);
