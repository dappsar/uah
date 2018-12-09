// Import the page's CSS. Webpack will know what to do with it.
import '../css/app.css'
import {
  default as Web3
} from 'web3'
import {
  default as contract
} from 'truffle-contract'
import {
  default as sigUtil
} from 'eth-sig-util'

/*
 * Al compilar el controato "Election", truffle almacenará el ABI y desplegará toda 
 * la información del contrato en un archivo JSON, dentro de la carpeta Build.  Ese
 * archivo es utilizado para configurar la abstracción del contrato y poder crear
 * una instancia del mismo, por eso se realizar un import aca.
 */
import voting_artifacts from '../../build/contracts/Election.json';

// Proveedor de web3
var web3Provider = null;

// Para mantener la cuenta configurada antes de cambio por metamask
var accountOld = null;

// Contrato Principal
var Election = contract(voting_artifacts);

// uso para la consola de log
var logMidLength = 15000;

// uso para la consola de log
var logMaxLength = 20000;

// candidatos iniciales
let candidates = {
  'CNCO': 'candidato1',
  'Luis Fonzi': 'candidato2',
  'Daddy Yankee': 'candidato3',
  'Maluma': 'candidato4',
  'Ozuna': 'candidato5'
};


/**
 * Función para realizar la firma del voto
 */
window.firmar = function (candidate) {
  let candidateName = $('#candidatesSelect').val();
  let messageParams = [{
    type: 'string',
    name: 'Mensaje',
    value: 'Votar a ' + candidateName
  }]

  var from = web3.eth.accounts[0]
  var params = [messageParams, from]
  var method = 'eth_signTypedData'

  trace('Intentando firmar con MetaMask. Debería ver una ventana con los datos, para confirmar la firma');
  trace('Hash generado para la firma: ' + sigUtil.typedSignatureHash(messageParams));

  web3.currentProvider.sendAsync({
    method,
    params,
    from,
  }, function (err, result) {
    if (err) {
      return trace("Error intentando generar la firma: " + err);
    }
    if (result.error) {
      if (result.error.message.includes("User denied message signature")) {
        trace("El usuario decidió cancelar la firma en Metamask.");
      } else {
        trace("Error intentando generar la firma: " + result.error.message);
      }
      return;
    }
    trace("Se generaron los datos de un voto para el candidato " + candidateName + ". Para confirmar la votación y subirlo a la blockchain, complete los datos de la sección 'Votar y persitir en blockchain'");

    // Se ingresa en el campo firma, la firma generada
    $('#signatureCreated').val(result.result);
    trace('Firma generada:' + JSON.stringify(result.result))

    // Actualiza el select de votación con el de la firma
    $("#candidatesSelectVote").val($("#candidatesSelect").val());

  })
}

/**
 * Función para realizar la votación propiamente dicha
 */
window.votar = function (candidate) {
  let candidateName = $('#candidatesSelectVote').val();

  Election.deployed().then(function (contractInstance) {
    trace("Realizando intento de votación para el candidato: " + candidateName);
    contractInstance.vote(candidateName, $('#voter-address').val(), $('#voter-signature').val(), {
      gas: 125000,
      from: web3.eth.accounts[0]
    }).then(function () {
      let div_id = candidates[candidateName];
      return contractInstance.getVotesByCandidate.call(candidateName).then(function (v) {
        trace("Voto realizado para el candidato " + candidateName + ", con la cuenta: " + web3.eth.accounts[0]);
        $('#' + div_id).html(v.toString());
      });
    }, function (err) {
      if (err.message.includes("User denied transaction signature")) {
        trace("El usuario decidió cancelar la votación en Metamask.");
      } else {
        trace("Error realizando votación para el candidato" + candidateName + ". Error: " + err);
      }
    });
  });
}


/**
 * Función a la que se llama al detectarse una actualización de la cuenta
 * del proveedor de Web3 o un cambio de la red.
 */
window.updateProvider = function () {
  loadAccountData();
}

/**
 * Actualización de la cuenta del proveedor seleccionado, al cambiar 
 * el mismo (por lo general, al hacer un cambio de cuenta o red en 
 * Metamask)
 */
window.loadAccountData = function () {
  web3.eth.getCoinbase(function (err, account) {
    if (err === null) {
      document.getElementById('accountAddress').value = account;
      // En varias opciones al seleccionar MetaMask, se genera éste
      // evento de actualización, por lo que se actualiza el campo 
      // de la cuenta. No así, con el trace del cambio de cuenta (para
      // que no aparezca el mensaje tantas veces logueado). Por ello,
      // se deja el trace en otro if adicional, validanco contra una
      // variable (accountOld).
      if (accountOld != null && accountOld != account) {
        trace("Tiene configurada la cuenta: " + account);
        accountOld = account;
      }
    } else {
      trace("Error al cargar la cuenta del votante");
      $('#accountAddress').html(err);
    }
  });
}

/**
 * Al presionar sobre el botón "flecha" de la dirección del firmante, 
 * se copia la misma al control de la direcicón del votante.
 */
window.onClickBtnArrowAddress = function () {
  var address = document.getElementById('accountAddress').value;
  $('#voter-address').val(address);
  voteStateCheck();
}

/**
 * Al presionar sobre el botón "flecha" de la firma del firmante, se
 * copia la misma a la firma del votante.
 */
window.onClickBtnArrowSignature = function () {
  var signature = document.getElementById('signatureCreated').value;
  $('#voter-signature').val(signature);
  voteStateCheck();
}

/**
 * Validación de controles de dirección del votante y firma, para habilitar /
 * deshabilitar el botón de votación.
 */
window.voteStateCheck = function () {
  var signatureEmpty = ($('#voter-signature').val().trim() == '');
  var addressEmpty = ($('#voter-address').val().trim() == '');

  if (signatureEmpty || addressEmpty) {
    $('#btnVotar').attr('disabled', true)
  } else {
    $('#btnVotar').attr('disabled', false);
  }
}

/**
 * Registro de ventos en la sección que hace de "consola" de log
 */
window.trace = function (s) {
  var logArea = $('#msg')[0];
  if (logArea.value.length > logMaxLength) {
    var start = logArea.value.indexOf("\n", logArea.value.length - logMidLength) + 1;
    logArea.value = "***Contenido del Log eliminado***\n" + logArea.value.slice(start);
  }
  var d = new Date();
  var timeString = addZero(d.getHours()) + ":" + addZero(d.getMinutes()) + ":" + addZero(d.getSeconds());
  logArea.value += " - " + timeString + ": => " + s + "\n";
  logArea.scrollTop = logArea.scrollHeight;
}

/**
 * Función para copletar con zeros a izquierda el dato 
 * de fecha, en la consola de log
 */
window.addZero = function (i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

window.setDataTable = function () {
  // Creación de la tabla de datos
  $('#example').DataTable({
    "paging": false,
    "ordering": true,
    "info": true,
    "language": {
      "sProcessing": "Procesando...",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "No se encontraron resultados",
      "sEmptyTable": "Ningún dato disponible en esta tabla",
      "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
      "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": "Buscar:",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }
    }
  });
}

window.setProvider = function () {

  // Control del proveedor web3
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      ethereum.enable();
      // Acccounts now exposed
    } catch (error) {
      raise(error);
    }
  } else if (window.web3) {
    if (typeof web3 !== 'undefined') {
      window.web3Provider = web3.currentProvider;
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      window.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      window.web3 = new Web3(window.web3Provider);
    };

  } else {
    trace("No se detectó MetaMask (https://metamask.io/) y es necesario para usar ésta aplicación!");
    return;
  }
  if (typeof web3 !== 'undefined') {
    // Set para detectar el cambio de cuenta de metamask. More info: https://medium.com/coinmonks/detecting-metamask-account-or-network-change-in-javascript-using-web3-1-0-0-18433e99df5a
    web3.currentProvider.publicConfigStore.on('update', window.updateProvider);
    Election.setProvider(web3.currentProvider);
  }
}

window.setData = function () {
  if (typeof web3 !== 'undefined') {
    window.web3.version.getNetwork((err, netId) => {
      var network = "";
      switch (netId) {
        case '1':
          network = 'MAINNET';
          break
        case '2':
          network = 'MORDEN (en deshuso!)';
          break
        case '3':
          network = 'ROPSTEN';
          break
        case '4':
          network = 'RINKEBY';
          break
        case '42':
          network = 'KOVAN';
          break
        default:
          network = 'No identificada o red Local';
      }
      trace("Tiene configurada la red: " + network);
      trace("Tiene configurada la cuenta: " + web3.eth.accounts[0]);
      accountOld = web3.eth.accounts[0];
    });

    window.loadAccountData();

    let candidateNames = Object.keys(candidates);
    var candidatesSelect = $('#candidatesSelect');
    candidatesSelect.empty();
    var candidatesSelectVote = $('#candidatesSelectVote');
    candidatesSelectVote.empty();

    // Seteo de candidatos y votos
    for (var i = 0; i < candidateNames.length; i++) {
      let name = candidateNames[i];

      candidatesSelect.append("<option value='" + name + "'>" + name + "</option>");
      candidatesSelectVote.append("<option value='" + name + "'>" + name + "</option>");

      Election.deployed().then(function (contractInstance) {
        contractInstance.getVotesByCandidate.call(name).then(function (v) {
          $('#' + candidates[name]).html(parseInt(v.toString()) || 0);
        });
      })
    }
  }
}

/**
 * Función inicial, que se ejecuta al terminar de cargar la página y
 * da comienzo a la aplicación web.
 */
$(document).ready(function () {
  setDataTable();
  setProvider();
  setData();
});