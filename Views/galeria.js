function loadphotos(){

    $.post('../Controllers/loadPhotos.php')
    .done(function(data){
        data = JSON.parse(data);
        for (let i = 0; i < Object.keys(data).length; i++) {
            var Image = 
            `
            <div class="imageDiv">
                <img src="${data[i].file}" alt="">
                <div class="infoIMG" id="imagen${i}">
                    <p class="text-font-white contentText" id=""><i>${data[i].nombreObservacion}</i>, capturado el ${data[i].captured_at}</p>
                    <p class="text-font-white contentText" id="">${data[i].integration_totalTime} hora(s) de exposición; ${data[i].filters}</p>
                </div>
            </div>
            <div class="sep"></div>
            `;

            $(".mainContent").append(Image);
        }
    });


}