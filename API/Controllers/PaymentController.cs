using System.IO;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using Order = Core.Entities.OrderAggregate.Order;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private const string WHSecret = "whsec_iACz55uN2RTN5FAZlNbU9kgvR2qzOQk8";
        private readonly ILogger<IPaymentService> _logger;
        public PaymentController(IPaymentService paymentService, ILogger<IPaymentService> logger)
        {
            _logger = logger;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

            if (basket == null) return BadRequest(new ApiResponse(400, "Problem with the basket"));

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WHSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Succeeded: ", intent.Id);
                     order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                     _logger.LogInformation("Order updated to payment received:" ,order.Id);
                    break;
                    
              
                case "payment_intent.failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Failed: ", intent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
                     _logger.LogInformation("Order updated to payment failed:" ,order.Id);
                    break;
            }

            return new EmptyResult();
        }


    }
}