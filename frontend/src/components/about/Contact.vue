<template>
    <div class="container contact p-5">
        <div class="jumbotron bg-white">
            <h1>Contato</h1>
            <!-- <a class="contact-facebook" href="#" target="_blank"><i class="fa fa-2x fa-facebook-square"></i> Facebook do PET</a><br> -->
            <a class="contact-instagram" href target="_blank"><i class="fa fa-2x fa-instagram"></i> @pettec </a><br>
            <!-- <a class="contact-email" href="#" target="_blank"><i class="fa fa-2x fa-at"></i> Email</a><br> -->
            <!-- <a class="contact-guitHub" href="#" target="_blank"><i class="fa fa-2x fa-github"></i> GitHub</a> -->
            
        </div>
    </div>
</template>

<script>
export default {
    name: "Contact"
}
</script>

<style>
    .contact p {
        text-align: justify;
    }

    .contact .jumbotron {
        box-shadow: 2px 2px 1px 1px rgba(0,0,0,0.2);
    }

    .contact a {
        text-decoration: none;
        color: black;
    }

    .contact i {
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .contact .btn {
        color: #DDD;
    }

    @media (max-width: 555px) {
        .contact h1 {
            font-size: 1.9rem;
        }

    }
</style>