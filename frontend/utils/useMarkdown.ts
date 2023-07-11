import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import containerPlugin from 'markdown-it-container';

const md = new MarkdownIt({
    html: true,
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

export function useMarkdown() {
    return md;
}