const habeas = document.getElementById('habeas');
const btnHabeas = document.getElementById('btnHabeas');
const formSection = document.getElementById('formSection');
const acomp = document.getElementById('acompanantes');
const numAcompanantesSection = document.getElementById('numAcompanantesSection');
const visa = document.getElementById('visa');
const paisSection = document.getElementById('paisSection');
const btnGenerar = document.getElementById('btnGenerar');
const mensajeSection = document.getElementById('mensajeSection');
const mensaje = document.getElementById('mensaje');
const btnCopiar = document.getElementById('btnCopiar');
const btnEditar = document.getElementById('btnEditar');
const copiadoMsg = document.getElementById('copiadoMsg');
const whatsLink = document.getElementById('whatsLink');
const btnStartScroll = document.getElementById('btnStartScroll');

// Smooth scroll helper
const scrollToElement = (element) => {
    window.scrollTo({
        top: element.offsetTop - 20, // Slight offset for padding
        behavior: 'smooth'
    });
};

// Landing page scroll button
if (btnStartScroll) {
    btnStartScroll.onclick = () => {
        const toolAnchor = document.getElementById('tool-anchor');
        if (toolAnchor) scrollToElement(toolAnchor);
    };
}

// Add smooth fade-in for sections
const fadeInSection = (element) => {
    element.classList.remove('hidden');
    element.style.opacity = 0;
    element.style.transform = 'translateY(10px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Small delay to allow browser to render the removal of hidden class
    requestAnimationFrame(() => {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
    });
};

btnHabeas.onclick = () => {
    if (!habeas.checked) return alert("Debes aceptar el Habeas Data para continuar.");
    fadeInSection(formSection);
    // Scroll slightly to show the form comfortably
    setTimeout(() => {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
};

acompanantes.onchange = () => {
    if (acomp.value === 'Sí') {
        numAcompanantesSection.classList.remove('hidden');
    } else {
        numAcompanantesSection.classList.add('hidden');
    }
};

visa.onchange = () => {
    if (visa.value === 'Europa (trabajo/pareja/estudio)') {
        paisSection.classList.remove('hidden');
    } else {
        paisSection.classList.add('hidden');
    }
};

btnGenerar.onclick = () => {
    let text = `Hola, Visa Para Todos.%0A%0A`;

    if (visa.value === 'Asesoria30') {
        text += `Quisiera agendar una asesoría de 30 minutos con ustedes.%0A`;
        text += `Tema de la consulta: ${proposito.value}%0A`;
        text += `Fecha estimada (si aplica): ${fecha.value}%0A%0A`;
        text += `Quedo atento(a) a la disponibilidad y costo. Muchas gracias.`;
    } else if (visa.value === 'SoloWhatsApp') {
        text += `Hola, solo quiero obtener su contacto de WhatsApp para hacer una consulta puntual.%0A%0A`;
        text += `Mi pregunta es sobre: ${proposito.value}.%0A`;
        text += `Quedo atento(a). Gracias.`;
    } else {
        text += `Me interesa iniciar un trámite con ustedes:%0A%0A`;
        text += `📋 Tipo de solicitud: ${visa.value}%0A`;
        text += `✈️ Propósito del viaje: ${proposito.value}%0A`;
        if (visa.value.includes('Europa')) text += `🌍 País destino: ${pais.value}%0A`;
        text += `👥 Acompañantes: ${acompanantes.value}%0A`;
        if (acompanantes.value === 'Sí') text += `   - Número de personas extra: ${numAcompanantes.value}%0A`;
        text += `📅 Fecha estimada: ${fecha.value}%0A%0A`;
        text += `Por favor indíquenme qué documentos necesito para empezar. Quedo atento(a).`;
    }

    // Decode properly
    mensaje.value = decodeURIComponent(text.replace(/%0A/g, "\n"));
    
    fadeInSection(mensajeSection);
    
    // Smooth scroll to the message section
    setTimeout(() => {
        mensajeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
};

btnCopiar.onclick = async () => {
    try {
        await navigator.clipboard.writeText(mensaje.value);
        copiadoMsg.classList.remove('hidden');
        whatsLink.href = `https://wa.me/12899216257`; // REEMPLAZAR CON TU NÚMERO
        whatsLink.classList.remove('hidden');
    } catch (err) {
        alert('No se pudo copiar el texto. Por favor cópialo manualmente.');
    }
};

btnEditar.onclick = () => {
    mensajeSection.classList.add('hidden');
    copiadoMsg.classList.add('hidden');
};
