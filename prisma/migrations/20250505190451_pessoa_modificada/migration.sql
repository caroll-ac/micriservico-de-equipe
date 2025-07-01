/*
  Warnings:

  - You are about to drop the column `dsc_cargo` on the `tp_pessoa_backup` table. All the data in the column will be lost.
  - You are about to drop the column `dsc_email` on the `tp_pessoa_backup` table. All the data in the column will be lost.
  - You are about to drop the column `dsc_matricula` on the `tp_pessoa_backup` table. All the data in the column will be lost.
  - You are about to drop the column `dsc_setor` on the `tp_pessoa_backup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tp_pessoa_backup" DROP COLUMN "dsc_cargo",
DROP COLUMN "dsc_email",
DROP COLUMN "dsc_matricula",
DROP COLUMN "dsc_setor";
