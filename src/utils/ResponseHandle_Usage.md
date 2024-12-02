
# API Response Handling with `ResponseHandle`

This document provides examples of how to use `ResponseHandle` to handle various API responses in a consistent and structured manner.

## Examples

### 1. General Success Response (HTTP 200)
```javascript
app.get('/api/success', (req, res) => {
  const data = { id: 1, name: 'Example Item' };
  ResponseHandle.success(res, data, 'Data fetched successfully');
});
```

### 2. Resource Created Successfully (HTTP 201)
```javascript
app.post('/api/resource', (req, res) => {
  const newData = { id: 2, name: req.body.name };
  ResponseHandle.created(res, newData, 'Resource created successfully');
});
```

### 3. Validation Error (HTTP 400 - Bad Request)
```javascript
app.post('/api/validate', (req, res) => {
  const { name } = req.body;
  if (!name) {
    ResponseHandle.error(res, 400, 'Validation failed: Name is required', null, req);
    return;
  }
  ResponseHandle.success(res, { name }, 'Validation passed');
});
```

### 4. Unauthorized Access (HTTP 401 - Unauthorized)
```javascript
app.get('/api/protected', (req, res) => {
  const isAuthenticated = false; // Example
  if (!isAuthenticated) {
    ResponseHandle.error(res, 401, 'Unauthorized access', null, req);
    return;
  }
  ResponseHandle.success(res, null, 'You have access');
});
```

### 5. Resource Not Found (HTTP 404 - Not Found)
```javascript
app.get('/api/not-found', (req, res) => {
  const item = null; // Example: no data found
  if (!item) {
    ResponseHandle.error(res, 404, 'Resource not found', null, req);
    return;
  }
  ResponseHandle.success(res, item, 'Resource found');
});
```

### 6. Server Error (HTTP 500 - Internal Server Error)
```javascript
app.get('/api/error', (req, res) => {
  try {
    throw new Error('Unexpected server error');
  } catch (err) {
    ResponseHandle.error(res, 500, 'An unexpected error occurred', err, req);
  }
});
```

### 7. Forbidden Access (HTTP 403 - Forbidden)
```javascript
app.get('/api/forbidden', (req, res) => {
  const hasPermission = false; // Example
  if (!hasPermission) {
    ResponseHandle.error(res, 403, 'You do not have permission to access this resource', null, req);
    return;
  }
  ResponseHandle.success(res, null, 'Permission granted');
});
```

### 8. Conflict Error (HTTP 409 - Conflict)
```javascript
app.post('/api/conflict', (req, res) => {
  const isDuplicate = true; // Example
  if (isDuplicate) {
    ResponseHandle.error(res, 409, 'Resource already exists', null, req);
    return;
  }
  ResponseHandle.created(res, { id: 3 }, 'Resource created successfully');
});
```

---

## Summary

### Success Responses
- **`ResponseHandle.success`**: Use for general success (200).
- **`ResponseHandle.created`**: Use when a resource is successfully created (201).

### Error Responses
- **400**: Use for bad requests or validation errors.
- **401**: Use for unauthorized access.
- **403**: Use for forbidden access.
- **404**: Use when a resource is not found.
- **409**: Use for conflict errors.
- **500**: Use for internal server errors.

### Passing Request Details
For error responses, always pass `req` to include additional context such as the endpoint, method, parameters, and body in the logs.
```javascript
ResponseHandle.error(res, 500, 'Error message', err, req);
```
