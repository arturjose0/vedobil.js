//verifica se o formulario com o id vdb-form existe
if (form = document.getElementById('vdb-form')) {

    //verifica se o botao do tipo submit foi pressionado
    form.addEventListener('submit', function (e) {

        //cancela a requisicao
        e.preventDefault();

        //pega o elemento com o id vdb-submit (que deve ser um botao)
        //vai servir para mostrar que os dados estao sendo enviados
        btn_submit = document.getElementById('vdb-submit');

        //pega o elemento com o id vdb-relatorio
        //vai servir para mostrar a mensagem do servidor
        relatorio = document.getElementById('vdb-relatorio');

        //verifica a variavel criada é válida
        if (btn_submit) {

            //coloca o testo padrao na variavel btn_msg
            var btn_msg = btn_submit.innerText;

            //chama a imagem de processamento
            btn_submit.innerHTML = '<img src="vedobil/img/vdb-load.gif" alt="">';

        }

        //pega todos os dados do formulario e coloca na variavel do tipo FormData
        var dados = new FormData(form);
        // console.log(dados);

        //faz a requisicao com o fetch
        fetch(form.action, {
            method: form.method,
            body: dados
        })
            .then(res => {
                //console.log(res.ok);
                if (!res.ok) throw new Error("Erro na requisição, Erro Nº #" + res.status);
                return res.json();
            })
            .then(data => {

                //console.log(data)

                //verifica se a variavel btn_msg existe
                //se sim coloca a mensagem padrao
                if (btn_msg) btn_submit.innerText = btn_msg;

                //verifica se a variavel relatorio existe
                //se sim coloca a mensagem do servidor
                if (relatorio) {
                    //arturjose0@gmail.com
                    //verifica se a mensagem do servidor existe
                    if (data['msg']) {
                        //alert alert-danger
                        if (relatorio.classList.contains('alert')) relatorio.classList.toggle('alert')
                        if (relatorio.classList.contains('alert-primary')) relatorio.classList.toggle('alert-primary');
                        if (relatorio.classList.contains('alert-warning')) relatorio.classList.toggle('alert-warning');

                        relatorio.classList.add('alert')

                        if (data['status'] === 'success') relatorio.classList.add('alert-primary');
                        else relatorio.classList.add('alert-warning');


                        relatorio.innerText = data['msg'];

                        setTimeout(function () {
                            if (relatorio.classList.contains('alert')) relatorio.classList.toggle('alert')
                            if (relatorio.classList.contains('alert-primary')) relatorio.classList.toggle('alert-primary');
                            if (relatorio.classList.contains('alert-warning')) relatorio.classList.toggle('alert-warning');
                            relatorio.innerText = "";
                        }, 9000)
                    }
                } else {

                    //caso a variavel relatorio nao existir coloca a mensagem do servidor em um alert
                    if (data['msg']) alert(data['msg']);

                }
                if (data['console']) console.log(data['console']);
                if (data['status'] === 'success') location.reload();

            })
            .catch((error) => {
                if (btn_msg) btn_submit.innerText = btn_msg;
                if (relatorio) {
                    //arturjose0@gmail.com
                    //verifica se a mensagem do servidor existe

                    //alert alert-danger
                    if (relatorio.classList.contains('alert')) relatorio.classList.toggle('alert');
                    if (relatorio.classList.contains('alert-primary')) relatorio.classList.toggle('alert-primary');
                    if (relatorio.classList.contains('alert-warning')) relatorio.classList.toggle('alert-warning');

                    relatorio.classList.add('alert')
                    relatorio.classList.add('alert-warning');

                    relatorio.innerText = error.message;

                } else {

                    //caso a variavel relatorio nao existir coloca a mensagem do servidor em um alert
                    alert(error.message);

                }
            });

    })

}


