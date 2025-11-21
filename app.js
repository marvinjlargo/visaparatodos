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
const finalMicrocopy = document.getElementById('finalMicrocopy');
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
    if (!habeas.checked) return alert("Por favor marca la casilla para confirmar que entiendes el proceso.");
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
    let text = `Hola, Visa Para Todos. 👋%0A%0A`;

    if (visa.value === 'Asesoria30') {
        text += `Me interesa agendar una *asesoría de 30 minutos*.%0A`;
        text += `Quiero hablar sobre: ${proposito.value}%0A`;
        text += `Fecha ideal para mí: ${fecha.value ? fecha.value : 'Lo antes posible'}%0A%0A`;
        text += `¿Me confirmas el precio y cómo pago? Gracias.`;
    } else if (visa.value === 'SoloWhatsApp') {
        text += `Vi su página web y tengo una duda rápida sobre: ${proposito.value}.%0A%0A`;
        text += `Quedo atento a su respuesta.`;
    } else {
        text += `Me gustaría que revisen mi caso para un trámite:%0A%0A`;
        text += `📌 *Trámite:* ${visa.value}%0A`;
        text += `✈️ *Motivo:* ${proposito.value}%0A`;
        if (visa.value.includes('Europa')) text += `🌍 *País:* ${pais.value}%0A`;
        
        if (acompanantes.value === 'Sí') {
             text += `👥 *Viajo con:* Familia/Pareja (${numAcompanantes.value} más)%0A`;
        } else {
             text += `👤 *Viajo:* Solo(a)%0A`;
        }
        
        text += `📅 *Fecha aprox:* ${fecha.value ? fecha.value : 'Aún no sé'}%0A%0A`;
        text += `¿Qué documentos necesito para que empecemos? Quedo atento.`;
    }

    // Decode properly for display
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
        whatsLink.href = `https://wa.me/573101234567?text=${encodeURIComponent(mensaje.value)}`; // Replace with actual number if known, currently placeholder
        // NOTE: User instruction implies specific behavior. I kept the generic placeholder or the one in the previous file if it was specific. 
        // The previous file had a specific number: 12899216257. I will use that one to be safe.
        whatsLink.href = `https://wa.me/12899216257?text=${encodeURIComponent(mensaje.value)}`;
        
        whatsLink.classList.remove('hidden');
        
        // Auto open if possible (browser block popups usually prevents this without direct click, but we show the button)
        window.open(whatsLink.href, '_blank');

    } catch (err) {
        // Fallback if clipboard fails
        copiadoMsg.textContent = "No se pudo copiar automático. Por favor selecciona el texto y cópialo.";
        copiadoMsg.classList.remove('hidden');
        copiadoMsg.style.backgroundColor = "#FEF2F2";
        copiadoMsg.style.color = "#991B1B";
        copiadoMsg.style.borderColor = "#FECACA";
    }

    if (finalMicrocopy) finalMicrocopy.classList.remove('hidden');
};

btnEditar.onclick = () => {
    mensajeSection.classList.add('hidden');
    copiadoMsg.classList.add('hidden');
    whatsLink.classList.add('hidden');
    if (finalMicrocopy) finalMicrocopy.classList.add('hidden');
    // Scroll back to form
    formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
};