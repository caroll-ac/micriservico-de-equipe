/*
  Warnings:

  - You are about to drop the `tp_pessoa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tr_membro_equipe" DROP CONSTRAINT "tr_membro_equipe_cod_equipe_fkey";

-- DropForeignKey
ALTER TABLE "tr_membro_equipe" DROP CONSTRAINT "tr_membro_equipe_cod_pessoa_fkey";

-- AlterTable
ALTER TABLE "tp_equipe" ALTER COLUMN "dsc_nome" DROP NOT NULL;

-- DropTable
DROP TABLE "tp_pessoa";

-- CreateTable
CREATE TABLE "tref_pessoa" (
    "cod_pessoa" SERIAL NOT NULL,
    "dsc_nome_ref" TEXT NOT NULL,
    "nr_cpf_ref" TEXT NOT NULL,
    "dsc_status" BOOLEAN NOT NULL,

    CONSTRAINT "tref_pessoa_pkey" PRIMARY KEY ("cod_pessoa")
);

-- CreateIndex
CREATE UNIQUE INDEX "tref_pessoa_nr_cpf_ref_key" ON "tref_pessoa"("nr_cpf_ref");

-- AddForeignKey
ALTER TABLE "tr_membro_equipe" ADD CONSTRAINT "tr_membro_equipe_cod_equipe_fkey" FOREIGN KEY ("cod_equipe") REFERENCES "tp_equipe"("cod_equipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tr_membro_equipe" ADD CONSTRAINT "tr_membro_equipe_cod_pessoa_fkey" FOREIGN KEY ("cod_pessoa") REFERENCES "tref_pessoa"("cod_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
