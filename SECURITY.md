# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of the Fire Detection System seriously. If you believe you have found a security vulnerability, please report it to us responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

- **Email**: Send details to the project maintainer
- **GitHub Security Advisories**: Use the [Security Advisory](https://github.com/SalimTag/firedetection/security/advisories) feature

### What to Include

When reporting a vulnerability, please include:

1. **Description**: Clear description of the vulnerability
2. **Impact**: Potential impact and severity
3. **Steps to Reproduce**: Detailed steps to reproduce the issue
4. **Proof of Concept**: Code or screenshots demonstrating the vulnerability
5. **Suggested Fix**: If you have one (optional)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 14 days
  - Medium: Within 30 days
  - Low: Next release cycle

## Security Best Practices

### For Users

1. **API Keys**
   - Never commit API keys to version control
   - Store keys in `.env` files (not tracked by git)
   - Rotate keys regularly
   - Use environment-specific keys

2. **Dependencies**
   - Keep dependencies up to date
   - Run `npm audit` regularly
   - Review security advisories

3. **Deployment**
   - Use HTTPS in production
   - Enable security headers
   - Implement rate limiting
   - Monitor for unusual activity

### For Contributors

1. **Code Review**
   - All PRs require review before merging
   - Security-sensitive changes require extra scrutiny
   - Use static analysis tools

2. **Input Validation**
   - Validate all user inputs
   - Sanitize data before processing
   - Use TypeScript for type safety

3. **Authentication & Authorization**
   - Never expose sensitive credentials
   - Use secure authentication methods
   - Implement proper access controls

4. **Third-Party Services**
   - Vet external services carefully
   - Use official SDKs when available
   - Monitor API usage and limits

## Known Security Considerations

### Client-Side API Keys

⚠️ **Note**: This application uses client-side API calls to Roboflow. While the API key is included in the built JavaScript bundle, this is acceptable for this use case because:

1. Roboflow API keys are designed for client-side use
2. Usage is rate-limited and monitored by Roboflow
3. No sensitive user data is processed

**Recommendation**: For production deployments with sensitive data, consider implementing a backend proxy to hide API keys.

### File Uploads

- Files are validated client-side (type and size)
- Files are processed in-memory (not stored on server)
- Consider implementing server-side validation for production

### CORS

- Application uses permissive CORS for development
- Configure restrictive CORS policies for production

## Security Updates

Security updates will be:

1. Released as soon as possible after discovery
2. Announced in GitHub Security Advisories
3. Documented in the CHANGELOG
4. Tagged with security labels

## Dependency Security

We use automated tools to monitor dependencies:

- **Dependabot**: Automated dependency updates
- **npm audit**: Regular security audits
- **GitHub Security Advisories**: Monitor for known vulnerabilities

Run security checks:

```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# See detailed report
npm audit --json
```

## Secure Coding Practices

### Input Validation

```typescript
// ✅ Good: Validate file type and size
if (!file.type.startsWith('image/')) {
  throw new Error('Invalid file type');
}
if (file.size > MAX_SIZE) {
  throw new Error('File too large');
}
```

### API Key Management

```typescript
// ✅ Good: Use environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

// ❌ Bad: Hardcoded keys
const API_KEY = "hardcoded-key-123";
```

### Error Handling

```typescript
// ✅ Good: Don't expose internal errors
try {
  await processImage(file);
} catch (error) {
  console.error('Internal error:', error);
  throw new Error('Failed to process image');
}
```

## Security Checklist

### Before Deployment

- [ ] Environment variables configured
- [ ] No hardcoded secrets in code
- [ ] Dependencies up to date
- [ ] Security headers enabled
- [ ] HTTPS configured
- [ ] Error messages don't expose internals
- [ ] Input validation implemented
- [ ] Rate limiting configured (if applicable)
- [ ] Logging and monitoring set up
- [ ] Security audit completed

### During Development

- [ ] Use `.env` files for secrets
- [ ] Add `.env` to `.gitignore`
- [ ] Review dependencies before installing
- [ ] Run security audits regularly
- [ ] Use TypeScript for type safety
- [ ] Validate all user inputs
- [ ] Handle errors gracefully
- [ ] Use HTTPS for external APIs

## Disclosure Policy

We follow coordinated vulnerability disclosure:

1. Security researcher reports vulnerability privately
2. We acknowledge and investigate
3. We develop and test a fix
4. We release the fix
5. Public disclosure (typically 90 days after fix)

## Hall of Fame

We recognize security researchers who responsibly disclose vulnerabilities:

<!-- Add contributors here -->

---

**Last Updated**: February 2025

For questions about security, please contact the project maintainer.
