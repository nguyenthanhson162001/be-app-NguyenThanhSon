#function

# Submit form A and B

## Public APIs

1. Saving users’ information to database:
   - Validation
   - Secure
2. Getting the list of registered users from each event:
   - Get param EventID => send list subscribing
   - pagination
3. Unsubscribing users
   - Get param UserID => remove user => send status

## Authenticated APIs:

1. Authorizing
   - Receives [Email] & [Password]
   - It responses with JWT string contains role of valid account.
2. Modifying user information:
   - check authenticated => update infomation user that registered through the form.
3. Statistic API:
   - check authenticated => Receives email => send list events registered, info user
