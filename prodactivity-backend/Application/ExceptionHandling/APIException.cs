using System;

namespace prodactivity 
{
    public class APIException : Exception
    {
        public int StatusCode { get; }

        public APIException()
        {
        }

        public APIException(int statusCode, string message)
            : base(message)
        {
            StatusCode = statusCode;
        }

        public APIException(int statusCode, string message, Exception inner)
            : base(message, inner)
        {
            StatusCode = statusCode;
        }
    }
}