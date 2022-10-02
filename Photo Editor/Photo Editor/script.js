// ######################## SETTING UP THE VARIBLES #########################

let brightness = 100,  saturation = 100, inversion = 0, grayscale = 0
let blur = 0, rotate = 0, flip = 1, sepia = 20

let file_i = document.querySelector('.file-input')
let choose_img = document.querySelector('.choose-img')
let preview = document.querySelector('.preview-img img')
let filter_options = document.querySelector('.filter .options')
let slider = document.querySelector('.slider .name')
let slider_value = document.querySelector('.slider input')
let rotate_slider = document.querySelectorAll('.rotate_flip input')
let rotate_slider_button = document.querySelectorAll('.rotate_flip button')
let reset = document.querySelector('.controls .reset-filter')
let save = document.querySelector('.save-img')

// ####################### PROPAGATION OF EVENTS ##############################
   

choose_img.addEventListener('click', chooseimg)
file_i.addEventListener('change', displayimg)
slider_value.addEventListener('input', updateSlider)
reset.addEventListener('click', resetFilters)
save.addEventListener('click', saveImage)


for(let i = 0; i < rotate_slider.length; i++)
{
    rotate_slider[i].addEventListener('input', function(){
        
        console.log(rotate_slider[i].value)
        
        for(let i = 0; i < rotate_slider.length; i++)
        {

            if(rotate_slider[i].id == 'flip-i' || rotate_slider[i].id == 'sepia-i')
            {
                rotate_slider_button[i].innerText = `${rotate_slider[i].value} %`
            }

            else if(rotate_slider[i].id == 'rotate-i')
            {
                rotate_slider_button[i].innerText = `${rotate_slider[i].value} deg`
            }

            else if(rotate_slider[i].id == 'blur-i')
            {
                rotate_slider_button[i].innerText = `${rotate_slider[i].value} px`
            }

        }  

        console.log(rotate_slider_button[i].id)

        if(rotate_slider_button[i].id == "blur")
        {
            blur = rotate_slider[i].value
        }
 
        else if(rotate_slider_button[i].id == "rotate")
        {
            rotate = rotate_slider[i].value
        }

        else if(rotate_slider_button[i].id == "sepia")
        {
            sepia = rotate_slider[i].value
        }

        if(rotate_slider_button[i].id == "flip")
        {
            flip = rotate_slider[i].value
        }

        applyFilters()
        
    })
}

for(let i = 0; i < filter_options.children.length; i++)
{
    filter_options.children[i].addEventListener('click', function()
    {
        console.log('clicked')
        document.querySelector('.active').classList.remove('active')
        filter_options.children[i].classList.add('active')
        slider.innerHTML = filter_options.children[i].innerHTML
        
        if(filter_options.children[i].id == "brightness")
        {
            slider_value.max = "200"
            slider_value.value = brightness
            document.querySelector('.filter .value').innerText = `${brightness}%`
        }

        else if(filter_options.children[i].id == "saturation")
        {
            slider_value.value = saturation
            slider_value.max = "200"
            document.querySelector('.filter .value').innerText = `${saturation}%`
        }

        else if(filter_options.children[i].id == "inversion")
        {
            slider_value.value = inversion
            slider_value.max = "200"
            document.querySelector('.filter .value').innerText = `${inversion}%`
        }

        else if(filter_options.children[i].id == "grayscale")
        {
            slider_value.value = grayscale
            slider_value.max = "200"
            document.querySelector('.filter .value').innerText = `${grayscale}%`
        }

    })
}


//######################### FUNCTION DEFINITIONS #############################

function chooseimg(){
    file_i.click();
    console.log('clicked')
}

function displayimg(){

     if(file_i.files.length != 0)
     {
        console.log('file selected')
     }
     else{
        console.log('file not selected')
     }

     let file = file_i.files[0]
     
     preview.src = URL.createObjectURL(file)
}

function applyFilters()
{
    preview.style.transform =  `rotate(${rotate}deg) scaleX(${flip})`
    preview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) blur(${blur}px)
    sepia(${sepia}% `

   
}

function resetFilters(){

    brightness = 100, saturation = 100, inversion = 0, grayscale = 0, blur = 0, rotate = 0, sepia = 20, flip = 1;

    applyFilters()

    filter_options.children[0].click()

    for(let i = 0; i < rotate_slider.length; i++)
    {
        if(rotate_slider[i].id == 'blur-i')
        {
            rotate_slider[i].value = blur
            rotate_slider_button[i].innerText = `${blur} px`
        }

        else if(rotate_slider[i].id == 'rotate-i')
        {
            rotate_slider[i].value = rotate
            rotate_slider_button[i].innerText = `${rotate} deg`
        }

        else if(rotate_slider[i].id == 'sepia-i')
        {
            rotate_slider[i].value = sepia
            rotate_slider_button[i].innerText = `${sepia} %`
            
        }

        else if(rotate_slider[i].id == 'flip-i')
        {
            rotate_slider[i].value = flip
            rotate_slider_button[i].innerText = `${flip} %`
        }
    }

}

function saveImage()
{
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = preview.naturalWidth;
    canvas.height = preview.naturalHeight;
    
    ctx.filter = `blur(${blur}px) brightness(${brightness}%) sepia(${sepia}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate*10);
    }
    ctx.scale(flip, 1);
    ctx.drawImage(preview, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    let link = document.createElement("a");
    link.download = "Img.jpg";
    link.href = canvas.toDataURL();
    link.click();

}
function updateSlider(){

    document.querySelector('.value').innerText = `${slider_value.value}%`

    let sel_filter = document.querySelector('.filter .active')
    
    if(sel_filter.id == "brightness")
    {
         brightness = slider_value.value
    }

    else if(sel_filter.id == "saturation")
    {
         saturation = slider_value.value
    }

    else if(sel_filter.id == "inversion")
    {
         inversion = slider_value.value
    }

    else if(sel_filter.id == "grayscale")
    {
         grayscale = slider_value.value
    }

    applyFilters()

}
