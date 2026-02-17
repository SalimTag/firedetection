# Contributing to Fire Detection System

Thank you for considering contributing to the Fire Detection System! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node.js version)

### Suggesting Features

We welcome feature suggestions! Please:

- Check if the feature has already been requested
- Create an issue with the `enhancement` label
- Describe the feature and its use case
- Explain why it would be valuable

### Submitting Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/SalimTag/firedetection.git
   cd firedetection
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Add screenshots for UI changes

## 📋 Code Style Guidelines

### TypeScript/React

- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Add JSDoc comments for exported functions
- Keep components small and focused
- Use meaningful variable names

**Example:**
```typescript
/**
 * Detects fire in an uploaded image
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Detection[]>} Array of fire detections
 */
export async function detectFire(imageFile: File): Promise<Detection[]> {
  // Implementation
}
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use CSS variables for theme colors

### File Organization

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
└── types/          # TypeScript type definitions
```

## 🧪 Testing

### Running Tests

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Writing Tests

- Test user interactions
- Test edge cases
- Test error handling
- Mock external API calls

## 📚 Documentation

When adding features:

- Update README.md if needed
- Add JSDoc comments to functions
- Update ARCHITECTURE.md for significant changes
- Add examples in the documentation

## 🔒 Security

- Never commit API keys or secrets
- Use environment variables for configuration
- Validate all user inputs
- Follow security best practices
- Report security vulnerabilities privately to the maintainer

## 🎨 Design Guidelines

- Follow the existing design language
- Use consistent colors from the theme
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test on multiple screen sizes
- Optimize images and assets

## 📝 Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi colons, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding missing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```
feat: add video upload support
fix: resolve bounding box positioning issue
docs: update deployment guide
style: format code with prettier
refactor: simplify detection logic
perf: optimize image preprocessing
test: add unit tests for detection service
chore: update dependencies
```

## 🐛 Debugging

### Common Issues

**Build Fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Lint Errors:**
```bash
npm run lint
# Fix auto-fixable issues
npx eslint . --fix
```

**Environment Variables Not Working:**
- Ensure variables start with `VITE_`
- Restart the dev server after changing `.env`

## 📞 Getting Help

- Check existing issues and discussions
- Read the documentation in `/docs`
- Ask questions by creating an issue with the `question` label

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- Release notes
- CONTRIBUTORS.md file
- GitHub contributors page

Thank you for making this project better! 🎉

---

**Questions?** Open an issue or contact [@SalimTag](https://github.com/SalimTag)
