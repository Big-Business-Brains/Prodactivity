using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using Newtonsoft.Json;

namespace prodactivity
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JsonSerializerSettings _jsonSerializerSettings = new JsonSerializerSettings { ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver() };
    
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
    
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }
    
        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var exc = exception as APIException;
            context.Response.StatusCode = (exc != null) ? exc.StatusCode : (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";
            
            return context.Response.WriteAsync(JsonConvert.SerializeObject(new APIResponse(exception.Message), _jsonSerializerSettings));
        }
    }
}