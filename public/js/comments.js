console.log("commment file loaded")
let commentBtn = document.querySelectorAll(".commentBtn")

//create function that gets
const commentFormHandler = async(event) => {

    event.preventDefault();

    const content = event.target.previousElementSibling.value;
    const collectid = event.target.dataset.collectid;

    console.log(event.target)




    const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ content: content, collectId: Number(collectid) }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/feed')
    }

}

commentBtn.forEach((comment) => {

    comment.addEventListener('click', commentFormHandler)
})


//TODO: make an event listener for all delete buttons that will pin the delete endpoint for the NFT Card

//TODO: make a function to send to new endpoint that filters that keyword