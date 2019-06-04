(function(window) {
    'use strict';
    const body = document.querySelector('body');
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            return res.json();
        })
        .then((posts) => {
            posts.forEach((post) => {
                $(body).append(`
              <article>
                <h2 data-posts="title">${post.title}</h2>
                <p data-posts="body">${post.body.replace('\n', '<br>')}</p>

                <button data-posts="id" value="${post.id}" type="button">Show comments</button>

                <section class="comments" id="comments-${post.id}" hidden>
                    <h3>Comments</h3>
                </section>
            </article>`);
            });
        })

    .then(() => {
        const BUTTON_SELECTOR = '[data-posts="id"]';
        let buttons = document.querySelectorAll(BUTTON_SELECTOR);


        buttons.forEach(function(button) {
            'use strict';

            let sectionSelector = `#comments-${button.value}`;
            let commentSection = document.querySelector(sectionSelector);

            button.addEventListener('click', function(event) {
                if (commentSection.hidden) {
                    commentSection.hidden = false;
                    button.textContent = 'Hide comments';

                    if (commentSection.getAttribute('loaded') === null) {
                        commentSection.setAttribute('loaded', '');
                        fetch(`https://jsonplaceholder.typicode.com/posts/${button.value}/comments`)
                            .then((res) => {
                                return res.json();
                            })
                            .then((comments) => {
                                comments.forEach((comment) => {
                                    $(commentSection).append(`
                                  <p data-comments="body">${comment.body.replace('\n', '<br>')}</p>
                                  <address data-comments="name">
                                      <a data-comments="email" href="mailto:${comment.email}">${comment.name}</a>
                                  </address>`);
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                } else {
                    commentSection.hidden = true;
                    button.textContent = 'Show comments';
                }
                event.preventDefault();
            });
        });
    });
})(window);
