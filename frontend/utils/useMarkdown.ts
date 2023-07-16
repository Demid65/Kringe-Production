import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import containerPlugin from 'markdown-it-container';

const md = new MarkdownIt({
    breaks: true,
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {language: lang}).value;
            } catch (err) {
                console.log(err)
            }
        }

        return ''; // use external default escaping
    }
})

md.use(containerPlugin, 'spoiler', {

    validate: function(params) {
        return params.trim().match(/^spoiler\s+(.*)$/);
    },

    render: function (tokens, idx) {
        const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<details class="collapse collapse-arrow bg-base-300 my-2"><summary class="collapse-title text-xl font-medium">' + md.utils.escapeHtml(m[1]) + '</summary>\n<div class="collapse-content">';

        } else {
            // closing tag
            return '</div></details>\n';
        }
    }
});

md.use(containerPlugin, 'danger', {

    validate: function(params) {
        return params.trim().match(/^danger(.*)$/);
    },

    render: function (tokens, idx) {
        const m = tokens[idx].info.trim().match(/^danger(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<div class="card card-bordered border-error w-full bg-base-100 my-2"><div class="card-body p-4">'
        } else {
            // closing tag
            return '</div></div>';
        }
    }
});

md.use(containerPlugin, 'info', {

    validate: function(params) {
        return params.trim().match(/^info(.*)$/);
    },

    render: function (tokens, idx) {
        const m = tokens[idx].info.trim().match(/^info(.*)$/);

        if (tokens[idx].nesting === 1) {
            // opening tag
            return '<div class="card card-bordered border-info w-full bg-base-100 my-2"><div class="card-body p-4">'
        } else {
            // closing tag
            return '</div></div>';
        }
    }
});

export function useMarkdown() {
    return md;
}