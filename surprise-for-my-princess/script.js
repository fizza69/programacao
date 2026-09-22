const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const mensagem = document.querySelector("#mensagem");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const SCALE = Math.min(
    window.innerWidth,
    window.innerHeight
) / 35;


const WORDS = [
    "love you",
    "Love You",
    "LOVE YOU"
];


const COLORS = [
    "rgb(70, 130, 180)",
    "rgb(30, 144, 255)",
    "rgb(0, 191, 255)",
    "rgb(100, 149, 237)",
    "rgb(65, 105, 225)"
];


function heartXY(t) {

    let x = 16 * (Math.sin(t) ** 3);

    let y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x: x,
        y: -y
    };
}


function toScreen(x, y) {

    return {
        x: x * SCALE + canvas.width / 2,
        y: y * SCALE + canvas.height / 2
    };
}


class Particle {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.word =
            WORDS[
                Math.floor(
                    Math.random() * WORDS.length
                )
            ];

        this.color =
            COLORS[
                Math.floor(
                    Math.random() * COLORS.length
                )
            ];

        this.alpha = 0;

        this.delay =
            Math.random() * 180;

        this.tempo = 0;

        this.size =
            Math.random() * 5 + 8;
    }


    atualizar() {

        this.tempo += 1;


        if (this.tempo > this.delay) {

            if (this.alpha < 1) {
                this.alpha += 0.015;
            }

        }

    }


    desenhar() {

    if (this.alpha <= 0) {
        return;
    }


    ctx.save();


    ctx.globalAlpha = this.alpha;

    ctx.fillStyle = this.color;


    ctx.font =
        `${this.size}px "Cormorant Garamond", serif`;

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";


    // Brilho individual de cada "Love You"

    ctx.shadowColor = this.color;

    ctx.shadowBlur = 10;


    ctx.fillText(
        this.word,
        this.x,
        this.y
    );


    ctx.restore();

}

}


let particles = [];


/*
    BORDA DO CORAÇÃO

    Aumentamos a quantidade para
    deixar a forma mais preenchida.
*/

function buildOutlineParticles() {

    const quantidade = 220;


    for (let i = 0; i < quantidade; i++) {

        let t =
            (i / quantidade)
            * Math.PI
            * 2;


        let ponto =
            heartXY(t);


        let tela =
            toScreen(
                ponto.x,
                ponto.y
            );


        particles.push(
            new Particle(
                tela.x,
                tela.y
            )
        );

    }

}


/*
    INTERIOR DO CORAÇÃO

    Agora temos muito mais frases
    espalhadas dentro do coração.
*/

function buildFillParticles() {

    const quantidade = 650;

    let criadas = 0;

    let tentativas = 0;

    const maxTentativas = quantidade * 100;


    /*
        Criamos uma "borda virtual" usando
        exatamente a mesma matemática do
        coração principal.
    */

    const pontosCoracao = [];

    const quantidadeBorda = 500;


    for (let i = 0; i < quantidadeBorda; i++) {

        let t =
            (i / quantidadeBorda)
            * Math.PI
            * 2;


        let ponto =
            heartXY(t);


        pontosCoracao.push({
            x: ponto.x,
            y: ponto.y
        });

    }


    /*
        Verifica se um ponto está dentro
        do coração.
    */

    function estaDentro(x, y) {

        let dentro = false;


        for (
            let i = 0, j = pontosCoracao.length - 1;
            i < pontosCoracao.length;
            j = i++
        ) {

            let xi = pontosCoracao[i].x;
            let yi = pontosCoracao[i].y;

            let xj = pontosCoracao[j].x;
            let yj = pontosCoracao[j].y;


            let cruza =
                (
                    (yi > y) !== (yj > y)
                )
                &&
                (
                    x <
                    (xj - xi)
                    * (y - yi)
                    / (yj - yi)
                    + xi
                );


            if (cruza) {

                dentro = !dentro;

            }

        }


        return dentro;

    }


    /*
        Descobrimos o tamanho real do coração.
    */

    let minX = Infinity;
    let maxX = -Infinity;

    let minY = Infinity;
    let maxY = -Infinity;


    for (let ponto of pontosCoracao) {

        minX =
            Math.min(
                minX,
                ponto.x
            );

        maxX =
            Math.max(
                maxX,
                ponto.x
            );

        minY =
            Math.min(
                minY,
                ponto.y
            );

        maxY =
            Math.max(
                maxY,
                ponto.y
            );

    }


    /*
        Sorteamos posições aleatórias dentro
        da caixa do coração.

        Só aceitamos as que realmente estão
        dentro da curva.
    */

    while (
        criadas < quantidade &&
        tentativas < maxTentativas
    ) {

        tentativas++;


        let x =
            Math.random()
            * (maxX - minX)
            + minX;


        let y =
            Math.random()
            * (maxY - minY)
            + minY;


        /*
            Se estiver fora do coração,
            simplesmente tentamos outra posição.
        */

        if (!estaDentro(x, y)) {

            continue;

        }


        let tela =
            toScreen(
                x,
                y
            );


        /*
            Evita que as frases fiquem
            todas grudadas.
        */

        let muitoPerto = false;


        for (let particle of particles) {

            let distancia =
                Math.hypot(
                    tela.x - particle.x,
                    tela.y - particle.y
                );


            if (distancia < 15) {

                muitoPerto = true;

                break;

            }

        }


        if (muitoPerto) {

            continue;

        }


        let particle =
            new Particle(
                tela.x,
                tela.y
            );


        particle.size =
            Math.random() * 4 + 7;


        particles.push(particle);


        criadas++;

    }

}
/*
    BRILHO DO CORAÇÃO

    O brilho fica atrás das frases.
*/

function drawHeartGlow() {

    let centroX =
        canvas.width / 2;

    let centroY =
        canvas.height / 2;


    let gradiente =
        ctx.createRadialGradient(
            centroX,
            centroY,
            SCALE * 3,
            centroX,
            centroY,
            SCALE * 18
        );


    gradiente.addColorStop(
        0,
        "rgba(30, 144, 255, 0.25)"
    );

    gradiente.addColorStop(
        0.3,
        "rgba(30, 144, 255, 0.13)"
    );

    gradiente.addColorStop(
        0.6,
        "rgba(30, 144, 255, 0.05)"
    );

    gradiente.addColorStop(
        1,
        "rgba(30, 144, 255, 0)"
    );


    ctx.fillStyle = gradiente;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


let inicio = Date.now();



function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
        Primeiro desenhamos o brilho.

        Depois as frases.

        Isso faz o brilho ficar
        visualmente atrás do coração.
    */

    drawHeartGlow();


    for (let particle of particles) {

        particle.atualizar();

        particle.desenhar();

    }



    requestAnimationFrame(animate);

}


let cliques = 0;


mensagem.style.pointerEvents = "auto";




window.addEventListener(
    "resize",
    function() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }
);


buildOutlineParticles();

buildFillParticles();

animate();