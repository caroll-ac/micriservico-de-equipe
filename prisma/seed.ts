import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const pessoas = [
        { id: 1, nome: 'Ryan', cpf: '00011122233', status: true },
        { id: 2, nome: 'Ana', cpf: '11122233344', status: true },
        { id: 3, nome: 'Afonso', cpf: '22233344455', status: true },
        { id: 4, nome: 'Maria', cpf: '33344455566', status: true },
    ];

    const equipes = [
        { nome: 'Equipe de Supervisão', descricao: 'Responsável por supervisionar as missões de campo' },
        { nome: 'Equipe de Organização', descricao: 'Responsável por zelar pelos objetos usados nas missões de campo' },
        { nome: 'Equipe de Trabalho', descricao: 'Responsável por executar missões de campo' },
    ];

    console.log('\n=== SEEDING PESSOAS ===');
    let pessoaCriada = 0, pessoaDuplicada = 0, pessoaErro = 0;
    const pessoasCriadas: any[] = [];
    
    for (const item of pessoas) {
        try {
            const existente = await prisma.pessoa.findUnique({
                where: { cpf: item.cpf },
            });
            if (existente) {
                pessoaDuplicada++;
                pessoasCriadas.push(existente);
                continue;
            }
            const nova = await prisma.pessoa.create({
                data: {
                    pessoaRef: item.id,
                    nome: item.nome,
                    cpf: item.cpf,
                    status: item.status,
                }
            });
            pessoaCriada++;
            pessoasCriadas.push(nova);
        } catch (error) {
            console.log(error);
            pessoaErro++;
        }
    }

    console.log(`Pessoas: ${pessoaCriada} criadas, ${pessoaDuplicada} duplicadas, ${pessoaErro} erradas`);

    console.log('\n=== SEEDING EQUIPES ===');
    let equipeCriada = 0, equipeErro = 0;
    const equipesCriadas: any[] = [];

    for (const item of equipes) {
        try {
            const nova = await prisma.equipe.create({
                data: {
                    nome: item.nome || null,
                    descricao: item.descricao || null,
                    usrCriacao: 1,
                    dataCriacao: new Date(),
                    dataUpdate: new Date(),
                }
            });
            equipesCriadas.push(nova);
            equipeCriada++;
        } catch (error) {
            console.log('Erro ao criar equipe:', error);
            equipeErro++;
        }
    }

    console.log(`Equipes: ${equipeCriada} criadas, ${equipeErro} erradas`);

    console.log('\n=== SEEDING EQUIPE COMPOSICAO ===');
    let equipeComposicaoCriada = 0, equipeComposicaoErro = 0;

    const equipeComposicoes = [
        { equipeId: equipesCriadas[0].id, pessoaId: pessoasCriadas[0].id, finalidade: 'Supervisor' },
        { equipeId: equipesCriadas[1].id, pessoaId: pessoasCriadas[1].id, finalidade: 'Apoio' },
        { equipeId: equipesCriadas[2].id, pessoaId: pessoasCriadas[2].id, finalidade: 'Gerente' },
    ];

    for (const item of equipeComposicoes) {
        try {
            await prisma.equipeComposicao.create({
                data: {
                    equipeId: item.equipeId,
                    pessoaId: item.pessoaId,
                    finalidade: item.finalidade || null,
                    usrCriacao: 1,
                    dataCriacao: new Date(),
                    dataUpdate: new Date(),
                }
            });
            equipeComposicaoCriada++;
        } catch (error) {
            console.log('Erro ao criar equipeComposicao: ', error);
            equipeComposicaoErro++;
        }
    }

    console.log(`Equipe Composicao: ${equipeComposicaoCriada} criadas, ${equipeComposicaoErro} erradas`);

    console.log('\n=== RESUMO FINAL DO SEED ===');
    console.log(`Pessoas: ${pessoaCriada} criadas`);
    console.log(`Equipes: ${equipeCriada} criadas`);
    console.log(`Equipe Composicao: ${equipeComposicaoCriada} criadas`);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
