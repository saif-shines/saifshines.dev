---
title: Managing Multiple SSH Keys for Git and GitHub
description: A comprehensive guide to streamline your workflow when working with multiple GitHub accounts and SSH keys.
date: 2024-07-31
---

**You use multiple GitHub accounts.** You have personal projects and work projects. When you commit code, you want the correct account to show as the author on GitHub.

**Your current workflow is painful.** You constantly run commands like:

- `ssh-add -D ~/.ssh/work-key` (remove current key)
- `ssh-add ~/.ssh/personal-key` (add personal key)

**But it doesn't always work.** Even after switching keys, commits still show under the wrong account. This happens because **SSH keys and Git author information are separate things**.

## The Solution

**SSH keys authenticate you to GitHub.** They prove you have permission to push code.
**Git configuration sets the commit author.** This is what shows up as "Author" on GitHub.

You need to configure both. Here's how to do it once and forget about it.

## Step 1: Configure SSH for Multiple Accounts

Create a `~/.ssh/config` file. This file tells SSH which key to use for each GitHub account.

```bash
# Create the config file if it doesn't exist
touch ~/.ssh/config
# Open it in your editor
code ~/.ssh/config  # or use nano, vim, etc.
```

Add this content to the file:

```
# Personal GitHub account
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

# Work GitHub account
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
```

**Important:** Replace the `IdentityFile` paths with your actual SSH key file names.

## Step 2: Set Up Git Author Information

Git uses your name and email to set commit authorship. **Set this per repository**, not globally.

### For Personal Projects

```bash
cd /path/to/personal/project
git config user.name "Your Name"
git config user.email "your-personal-email@example.com"
```

### For Work Projects

```bash
cd /path/to/work/project
git config user.name "Your Name"
git config user.email "your-work-email@company.com"
```

**Tip:** Use the same name but different emails. This keeps your GitHub profile consistent while separating personal and work commits.

## Step 3: Clone Repositories with Your New Setup

Use your SSH config aliases when cloning repositories.

**For personal repositories:**

```bash
git clone git@github-personal:yourusername/repository-name.git
```

**For work repositories:**

```bash
git clone git@github-work:company/repository-name.git
```

**What happens:** SSH automatically uses the correct key based on the host (`github-personal` vs `github-work`).

## Alternative: Per-Project SSH Configuration

If you prefer not to use SSH config, set the SSH command per repository:

```bash
# For personal projects
cd /path/to/personal/project
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_personal -F /dev/null"

# For work projects
cd /path/to/work/project
git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_work -F /dev/null"
```

## Verify Everything Works

Check your repository's Git configuration:

```bash
git config --list --local | grep user
```

Test SSH connections:

```bash
ssh -T git@github-personal  # Should show success message
ssh -T git@github-work      # Should show success message
```

Make a test commit and push. Check GitHub to confirm the correct author shows up.

## Common Issues and Solutions

### "Permission denied" error

**Problem:** SSH can't find or use your key.
**Solution:** Check that your key file path is correct in `~/.ssh/config` and that the file has proper permissions (`chmod 600 ~/.ssh/key-file`).

### Wrong author still shows on GitHub

**Problem:** You set the SSH key but not the Git author information.
**Solution:** Run the `git config` commands from Step 2 in your repository.

### "Host key verification failed" error

**Problem:** GitHub's host key isn't in your `known_hosts` file.
**Solution:** Connect once manually: `ssh -T git@github.com`

### Already cloned repositories don't use new SSH config

**Problem:** Existing repositories don't automatically use your new SSH aliases.
**Solution:** Update the remote URL:

```bash
git remote set-url origin git@github-personal:username/repo.git
```

## Why This Happens

SSH authentication and Git commit authorship work separately:

1. **SSH proves who you are** to GitHub's servers
2. **Git records who wrote the code** in the commit metadata
3. The email in your SSH key comment is just a label — it doesn't affect Git commits

This separation lets you use one SSH key for multiple Git accounts, or different SSH keys for the same Git account.

<div style="text-align: center">⁂</div>

[^1]: https://stackoverflow.com/questions/69508635/why-doesnt-changing-my-ssh-key-make-the-correct-author-be-shown-for-my-commits
[^2]: https://www.codeconcisely.com/posts/switching-ssh-keys-between-git-projects/
[^3]: https://infotechys.com/multiple-ssh-keys-for-github/
[^4]: https://stackoverflow.com/questions/29023532/how-do-i-use-multiple-ssh-keys-on-github
[^5]: https://vanthanhtran245.github.io/use-multiple-ssh-key-for-different-git-accounts/
[^6]: https://gist.github.com/jexchan/2351996
[^7]: https://www.polpiella.dev/handling-multiple-git-ssh-keys
[^8]: https://gist.github.com/inakiarroyo/c3748b514e18cc85193ef545f03513c8
[^9]: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys
[^10]: https://www.endpointdev.com/blog/2013/12/managing-multiple-hosts-and-ssh/
