// DOCUMENTO PRINCIPAL - GERENCIADOR DE INTERAÇÕES

document.addEventListener('DOMContentLoaded', () => {

    // 1. INTERAÇÃO DA HOME: Cliques informativos nos Cards
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const informacaoTexto = card.getAttribute('data-info');
            // Altera dinamicamente o parágrafo interno para mostrar o dado oculto
            const p = card.querySelector('p');
            if (p.textContent === informacaoTexto) {
                p.textContent = "Clique para ver o impacto real no campo.";
                card.style.backgroundColor = "#fff";
            } else {
                p.textContent = informacaoTexto;
                p.style.fontWeight = "500";
                card.style.backgroundColor = "#e8f5e9";
            }
        });
    });

    // 2. INTERAÇÃO DA PÁGINA SOBRE: Efeito Accordion (Sanfona)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            
            if (body.style.maxHeight && body.style.maxHeight !== "0px") {
                body.style.maxHeight = "0px";
                body.style.paddingTop = "0px";
                body.style.paddingBottom = "0px";
            } else {
                body.style.maxHeight = body.scrollHeight + "20px";
                body.style.paddingTop = "15px";
                body.style.paddingBottom = "15px";
            }
        });
    });

    // 3. INTERAÇÃO DO SIMULADOR: Cálculos Matemáticos em Tempo Real
    const inputHectares = document.getElementById('hectares');
    const txtHectaresVal = document.getElementById('hectares-val');
    const checkIrrigacao = document.getElementById('tech-irrigacao');
    const checkSolar = document.getElementById('tech-solar');

    const resAgua = document.getElementById('resultado-agua');
    const resCo2 = document.getElementById('resultado-co2');

    function calcularImpacto() {
        if (!inputHectares) return; // Proteção caso o script rode em páginas sem o simulador

        const hectares = parseFloat(inputHectares.value);
        txtHectaresVal.textContent = hectares;

        let litrosEconomizados = 0;
        let co2Evitado = 0;

        // Regras de negócio simuladas por hectare
        if (checkIrrigacao && checkIrrigacao.checked) {
            litrosEconomizados = hectares * 15000; // 15 mil litros economizados por ha/ano
        }

        if (checkSolar && checkSolar.checked) {
            co2Evitado = hectares * 340; // 340kg de CO2 evitados por ha/ano
        }

        // Renderização dos dados formatados na tela
        resAgua.textContent = litrosEconomizados.toLocaleString('pt-BR') + " Litros";
        resCo2.textContent = co2Evitado.toLocaleString('pt-BR') + " kg";
    }

    // Escutadores de eventos para atualizar o simulador a cada alteração do usuário
    if (inputHectares) {
        inputHectares.addEventListener('input', calcularImpacto);
        checkIrrigacao.addEventListener('change', calcularImpacto);
        checkSolar.addEventListener('change', calcularImpacto);
        calcularImpacto(); // Executa uma vez no início para zerar os campos de forma elegante
    }
});