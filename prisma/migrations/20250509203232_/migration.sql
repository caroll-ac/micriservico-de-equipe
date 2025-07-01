/*
  Warnings:

  - You are about to drop the `tp_pessoa_backup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tr_membro_equipe" DROP CONSTRAINT "tr_membro_equipe_cod_pessoa_fkey";

-- DropTable
DROP TABLE "tp_pessoa_backup";

-- CreateTable
CREATE TABLE "tp_pessoa" (
    "cod_pessoa_backup" SERIAL NOT NULL,
    "dsc_nome_ref" TEXT NOT NULL,
    "nr_cpf_ref" TEXT NOT NULL,

    CONSTRAINT "tp_pessoa_pkey" PRIMARY KEY ("cod_pessoa_backup")
);

-- CreateIndex
CREATE UNIQUE INDEX "tp_pessoa_nr_cpf_ref_key" ON "tp_pessoa"("nr_cpf_ref");

-- AddForeignKey
ALTER TABLE "tr_membro_equipe" ADD CONSTRAINT "tr_membro_equipe_cod_pessoa_fkey" FOREIGN KEY ("cod_pessoa") REFERENCES "tp_pessoa"("cod_pessoa_backup") ON DELETE RESTRICT ON UPDATE CASCADE;
