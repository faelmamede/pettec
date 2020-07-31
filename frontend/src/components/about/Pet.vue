<template>
    <div class="sobre-pet my-4">
        <div class="sobre-pet-top bg-dark">
            <div class="sobre-pet-title">
                <h2 class="text-white">Programa de Educação Tutorial</h2>
            </div>
        </div>
        <div class="sobre-pet-content">
            <p class="text-muted m-0">
                O Programa de Educação Tutorial (PET) é um programa vinculado à Secretaria da Educação Superior – SESu/MEC. Foi criado para apoiar atividades acadêmicas que integram ensino, pesquisa e extensão.
                As atividades extracurriculares que compõem o Programa têm como objetivo garantir aos alunos do curso oportunidades de vivenciar experiências não presentes em estruturas curriculares convencionais, visando a sua formação global e favorecendo a formação acadêmica, tanto para a integração profissional quanto para o desenvolvimento de estudos em programas de pós-graduação.
            </p>
        </div>
        <div class="sobre-pet-footer">
            <hr class="my-0">
            <p class="text-muted">Para mais informações sobre o Programa (Nacional) PET, acesse a página do MEC.</p>
            <a class="btn btn-dark btn-lg" target="_blank" href="http://portal.mec.gov.br/index.php?option=com_content&view=article&id=12223&Itemid=480" role="button">Saiba mais</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pet"
}
</script>

<style>
    .sobre-pet {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sobre-pet-top {
        width: 90%;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .sobre-pet-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        padding-bottom: 5px;
    }

    .sobre-pet-content {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 0;
        background-color: #fff;
        padding: 25px;
        font-size: 1rem;
        box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);
    }

    .sobre-pet-footer {
        width: 90%;
        background-color: #fff;
        padding: 25px;
    }

    .sobre-pet-footer hr {
        border: 0;
        width: 100%;
        height: 2px;
        background-image: linear-gradient(to right, rgba(27, 25, 25, 0.356), rgba(27, 25, 25, 0.356), rgba(27, 25, 25, 0.356));
    }

    @media (max-width: 555px) {
        .sobre-pet-title h2 {
            font-size: 1.4rem;
        }
    }

</style>