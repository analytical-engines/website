---
title: "emacs-code-insight-mcp"
description: "Lend Emacs's code insight to any agent over MCP."
date: "2026-11-19"
repoURL: "https://github.com/analytical-engines/emacs-code-insight-mcp"
---

*For those who live in Emacs and code with agents.*

Your agent can't see what Emacs sees. Now it can.

Emacs already runs a language server for your project, with your settings and
warm indexes. This package keeps an MCP server running inside Emacs, so that
Claude Code, Codex, Gemini CLI or any other agent that speaks MCP can ask it
about code (types, definitions, references, callers, compile errors) instead of
grepping.

```
agent --MCP--> Emacs (lsp-mode or Eglot) --> language server (jdtls, clangd, ...)
```

Going through Emacs means the agent uses the same language server you do: no
second copy of a heavy server such as jdtls, and your configuration applies as
it is. Agents only ask; nothing moves on your screen.
