-- CreateTable
CREATE TABLE "tp_equipe" (
    "cod_equipe" SERIAL NOT NULL,
    "dsc_nome" TEXT NOT NULL,
    "dsc_descricao" TEXT,
    "cod_usuario_criacao" INTEGER NOT NULL,
    "cod_usuario_update" INTEGER,
    "cod_usuario_delete" INTEGER,
    "dat_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dat_atualizacao" TIMESTAMP(3) NOT NULL,
    "dat_delete" TIMESTAMP(3),

    CONSTRAINT "tp_equipe_pkey" PRIMARY KEY ("cod_equipe")
);

-- CreateTable
CREATE TABLE "tr_membro_equipe" (
    "cod_membro_equipe" SERIAL NOT NULL,
    "cod_equipe" INTEGER NOT NULL,
    "cod_pessoa" INTEGER NOT NULL,
    "dsc_finalidade" TEXT,

    CONSTRAINT "tr_membro_equipe_pkey" PRIMARY KEY ("cod_membro_equipe")
);

-- CreateTable
CREATE TABLE "tp_pessoa_backup" (
    "cod_pessoa_backup" SERIAL NOT NULL,
    "dsc_nome" TEXT NOT NULL,
    "dsc_cpf" TEXT NOT NULL,
    "dsc_matricula" TEXT NOT NULL,
    "dsc_email" TEXT NOT NULL,
    "dsc_cargo" TEXT NOT NULL,
    "dsc_setor" TEXT NOT NULL,

    CONSTRAINT "tp_pessoa_backup_pkey" PRIMARY KEY ("cod_pessoa_backup")
);

-- CreateIndex
CREATE UNIQUE INDEX "tp_equipe_dsc_nome_key" ON "tp_equipe"("dsc_nome");

-- CreateIndex
CREATE UNIQUE INDEX "tp_pessoa_backup_dsc_cpf_key" ON "tp_pessoa_backup"("dsc_cpf");

-- AddForeignKey
ALTER TABLE "tr_membro_equipe" ADD CONSTRAINT "tr_membro_equipe_cod_equipe_fkey" FOREIGN KEY ("cod_equipe") REFERENCES "tp_equipe"("cod_equipe") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tr_membro_equipe" ADD CONSTRAINT "tr_membro_equipe_cod_pessoa_fkey" FOREIGN KEY ("cod_pessoa") REFERENCES "tp_pessoa_backup"("cod_pessoa_backup") ON DELETE RESTRICT ON UPDATE CASCADE;
