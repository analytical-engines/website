---
title: "agent-shell-usage-limits"
description: "Show Claude Code usage limits in agent-shell mode lines."
date: "2026-10-30"
repoURL: "https://github.com/analytical-engines/agent-shell-usage-limits"
---

Shows the usage limits of your Claude subscription in the mode line of
[agent-shell](https://github.com/xenodium/agent-shell) buffers running Claude Code.

```
 5h:10%[4:26] 7d:39%[4d/13h]
```

That is the 5-hour window at 10 percent with 4 hours 26 minutes until it resets,
and the 7-day window at 39 percent with 4 days 13 hours to go: the same numbers
that `/usage` shows in the Claude Code CLI.

Holding mouse-1 on the display shows the details:

![The details popover](/projects/agent-shell-usage-limits-popover.png)

Requires agent-shell 0.89 or later and Claude Code logged in with a Claude subscription.
