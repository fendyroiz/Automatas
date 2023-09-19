import './style.css'

document.addEventListener('DOMContentLoaded', function () {
  const expresionRegularInput = document.getElementById('expresionRegular');
  const textoPruebaInput = document.getElementById('textoPrueba');
  const resultadosTextArea = document.getElementById('resultados');
  const tipoBusquedaSelect = document.getElementById('tipoBusqueda');
  const limpiarCamposButton = document.getElementById('limpiarCampos');

  
  const escaparExpresionRegular = (expresion) => {
      return expresion.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  
  const actualizarResultados = () => {
      const expresionRegular = expresionRegularInput.value;
      const textoPrueba = textoPruebaInput.value;
      const tipoBusqueda = tipoBusquedaSelect.value;

      try {
          const expresionRegularEscapada = escaparExpresionRegular(expresionRegular);

          const banderas = tipoBusqueda.split('').join('');

          const regex = new RegExp(expresionRegularEscapada, banderas);
          const matches = textoPrueba.match(regex);
          resultadosTextArea.value = matches ? matches.join('\n') : 'No se encontraron coincidencias.';

          const contadorMatches = matches ? matches.length : 0;
          document.getElementById('contadorMatches').textContent = `Cantidad de coincidencias: ${contadorMatches}`;
      } catch (error) {
          resultadosTextArea.value = 'Error en la expresión regular.';
      }
  };

  expresionRegularInput.addEventListener('input', actualizarResultados);
  textoPruebaInput.addEventListener('input', actualizarResultados);
  tipoBusquedaSelect.addEventListener('change', actualizarResultados);

  limpiarCamposButton.addEventListener('click', function () {
      expresionRegularInput.value = '';
      textoPruebaInput.value = '';
      resultadosTextArea.value = '';
      tipoBusquedaSelect.selectedIndex = 0;
      document.getElementById('contadorMatches').textContent = 'Cantidad de coincidencias: 0';
  });
});
