import { JSBT } from '../../JSBT';
import { User } from '../classes/User';

const user1 = new User('Alex', 'alex@test.com');
const user2 = new User('Test', 'test@test.com');

export const data = {
    userA: user1,
    userB: user1,
    userC: user1,
    userD: user2,
    userE: user2,
    data: {
        userId: 758109698549,
        FeatureFlags: {
            combinedFeatureFlagsByPageTypes: {
                atozdestinations: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
                content: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
                favourites: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
                flights: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
                hdp: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        experimentId: 'FCKHOrGm',
                        variantId: 'control',
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: new Boolean(true),
                    },
                },
                hdp_ho: {
                    BookEmailDealInBasket: {
                        value: new Boolean(true),
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: new Boolean(false),
                    },
                    CookiePreferences: {
                        value: new Boolean(true),
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
                hdp_meta: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        experimentId: 'FCKHOrGm',
                        variantId: 'control',
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
                homepage: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    AACachedLandingPagesHomepage: {
                        experimentId: 'eKt6dF4S',
                        variantId: 'ElcTUttBU',
                        value: true,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    SuggesterExperiment: {
                        experimentId: 'VWME7-MZ',
                        variantId: 'G77paHwK-',
                        value: 'destination_sort_click',
                    },
                    CachedHomepage: {
                        experimentId: 'm0YidavA',
                        variantId: 'dqK4VbfNl',
                        value: true,
                    },
                    ABHomepagePaydaydealsCTA: {
                        experimentId: '40BVeYBE',
                        variantId: 'QNAMFgZvN',
                        value: true,
                    },
                },
                landingsem: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    AACachedLandingPagesHomepage: {
                        experimentId: 'eKt6dF4S',
                        variantId: 'ElcTUttBU',
                        value: true,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    SuggesterExperiment: {
                        experimentId: 'VWME7-MZ',
                        variantId: 'G77paHwK-',
                        value: 'destination_sort_click',
                    },
                },
                landingseo: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    AACachedLandingPagesHomepage: {
                        experimentId: 'eKt6dF4S',
                        variantId: 'ElcTUttBU',
                        value: true,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    SuggesterExperiment: {
                        experimentId: 'VWME7-MZ',
                        variantId: 'G77paHwK-',
                        value: 'destination_sort_click',
                    },
                },
                other: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
                panda: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        experimentId: 'jpQHtwDP',
                        variantId: 'Jrwhq_XHB',
                        value: true,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        experimentId: 'FCKHOrGm',
                        variantId: 'control',
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    HandoffPolling: {
                        experimentId: 'cXemR3Md',
                        variantId: 'Mu-vgtDwQ',
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    RemoveFreeWifiFromPandaHotelSummary: {
                        experimentId: 'q6ofihiy',
                        variantId: 'tS91ndk_G',
                        value: true,
                    },
                    transactionFeeVariant: {
                        experimentId: '7fnLZrwg',
                        variantId: '7wKoCiS6k',
                        value: true,
                    },
                },
                srp: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        experimentId: 'jpQHtwDP',
                        variantId: 'Jrwhq_XHB',
                        value: true,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        experimentId: 'FCKHOrGm',
                        variantId: 'control',
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    SearchResultsPageAATest: {
                        experimentId: 'q9rD96_w',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    SuggesterExperiment: {
                        experimentId: 'VWME7-MZ',
                        variantId: 'G77paHwK-',
                        value: 'destination_sort_click',
                    },
                },
                handoff: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        experimentId: 'jpQHtwDP',
                        variantId: 'Jrwhq_XHB',
                        value: true,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    transactionFeeVariant: {
                        experimentId: '7fnLZrwg',
                        variantId: '7wKoCiS6k',
                        value: true,
                    },
                },
                offersummary: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        experimentId: 'u5b3Cr-j',
                        variantId: 'QqFBcuZAw',
                        value: true,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        experimentId: 'FCKHOrGm',
                        variantId: 'control',
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    CheckoutRightBasket: {
                        experimentId: 'ajViFPQq',
                        variantId: 'control',
                        value: false,
                    },
                    transactionFeeVariant: {
                        experimentId: '7fnLZrwg',
                        variantId: '7wKoCiS6k',
                        value: true,
                    },
                },
                passengerdetails: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        experimentId: 'u5b3Cr-j',
                        variantId: 'QqFBcuZAw',
                        value: true,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        experimentId: 'FCKHOrGm',
                        variantId: 'control',
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    CheckoutRightBasket: {
                        experimentId: 'ajViFPQq',
                        variantId: 'control',
                        value: false,
                    },
                    transactionFeeVariant: {
                        experimentId: '7fnLZrwg',
                        variantId: '7wKoCiS6k',
                        value: true,
                    },
                },
                paymentdetails: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        experimentId: 'FCKHOrGm',
                        variantId: 'control',
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    CheckoutRightBasket: {
                        experimentId: 'ajViFPQq',
                        variantId: 'control',
                        value: false,
                    },
                    transactionFeeVariant: {
                        experimentId: '7fnLZrwg',
                        variantId: '7wKoCiS6k',
                        value: true,
                    },
                },
                confirmation: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        experimentId: 'u5b3Cr-j',
                        variantId: 'QqFBcuZAw',
                        value: true,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    NewHotelImageSorting: {
                        experimentId: 'FufCAHJ9',
                        variantId: 'control',
                        value: false,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                    transactionFeeVariant: {
                        experimentId: '7fnLZrwg',
                        variantId: '7wKoCiS6k',
                        value: true,
                    },
                },
                checkouterror: {
                    BookEmailDealInBasket: {
                        value: true,
                    },
                    AlternativeFlightsOpenedByDefault: {
                        value: false,
                    },
                    CookiePreferences: {
                        value: true,
                    },
                    NewsletterEnabled: {
                        value: true,
                    },
                    DynamicPageMeta: {
                        value: true,
                    },
                    NewSearchPlatform: {
                        value: true,
                    },
                    ShowPromotionTags: {
                        value: true,
                    },
                    Trustpilot: {
                        value: true,
                    },
                    Favourites: {
                        value: true,
                    },
                    AbsoluteDiscountValue: {
                        value: true,
                    },
                    ShowDiscountHelp: {
                        value: true,
                    },
                    ShowWasCopy: {
                        value: false,
                    },
                    DisabledFreeAmendmentsV2: {
                        value: true,
                    },
                    RemoveGuestLoveOnHDP: {
                        value: false,
                    },
                    ShowUrgencyMessaging: {
                        value: true,
                    },
                    TransferAncillary: {
                        value: true,
                    },
                    SeatsAncillary: {
                        value: true,
                    },
                    InsuranceAncillary: {
                        value: true,
                    },
                    ParkingAncillary: {
                        value: false,
                    },
                    ShowPeakPrice: {
                        value: true,
                    },
                    PartyMessage: {
                        value: true,
                    },
                    HideBreakdown: {
                        value: false,
                    },
                    ShowAirportDetails: {
                        value: false,
                    },
                    UseNewHDPTabs: {
                        value: true,
                    },
                    ShowCheckoutMessaging: {
                        value: false,
                    },
                    ShowFeedbackWidget: {
                        value: false,
                    },
                    PreloadFonts: {
                        value: false,
                    },
                    ShowVoucherCodeInCheckout: {
                        value: true,
                    },
                    RegionResortFilter: {
                        value: true,
                    },
                    BookWithDepositSearchSashTooltip: {
                        value: false,
                    },
                    ShowHolidayCheckReviews: {
                        value: false,
                    },
                    FreeCancellation: {
                        value: false,
                    },
                    UseNewCheckout: {
                        value: false,
                    },
                    PriorityBoardingAncillary: {
                        value: true,
                    },
                    TrackTranslationErrors: {
                        value: true,
                    },
                    ShareDealConfirmation: {
                        value: false,
                    },
                    PaymentButtonReorder: {
                        value: false,
                    },
                    UseOldCheckout: {
                        value: false,
                    },
                    NewGalleryGrid: {
                        value: false,
                    },
                    StickyBasket: {
                        value: false,
                    },
                    NewErrorPage: {
                        value: true,
                    },
                    ShowMapBeforeRooms: {
                        value: true,
                    },
                    PrimerForceRedirect: {
                        value: false,
                    },
                    RudderstackV3: {
                        value: false,
                    },
                    ShowPandaPriceDescription: {
                        value: true,
                    },
                    NewCountdownTimer: {
                        value: true,
                    },
                    IncreasedMinMaxMargin: {
                        experimentId: 'TrtmKlSQ',
                        variantId: '6w5warhyp',
                        value: true,
                    },
                },
            },
            __typename: 'FeatureFlagQueries',
        },
    },
    extensions: {
        deprecatedFields: [],
        octopusActivations: [],
        priceScopeTokens: null,
        octopusEvid:
            'jpQHtwDP:Jrwhq_XHB,cXemR3Md:Mu-vgtDwQ,FufCAHJ9:control,eKt6dF4S:ElcTUttBU,u5b3Cr-j:QqFBcuZAw,q9rD96_w:control,FCKHOrGm:control,TrtmKlSQ:6w5warhyp,VWME7-MZ:G77paHwK-,ajViFPQq:control,q6ofihiy:tS91ndk_G,7fnLZrwg:7wKoCiS6k,m0YidavA:dqK4VbfNl,40BVeYBE:QNAMFgZvN',
        octopusRevision: 1731,
    },
};

describe('Real World Data Structure', () => {
    it('should encode and decode the object correct', () => {
        const jsbt = JSBT.encode(data);
        const res = JSBT.decode(jsbt);
        const u1 = data.userA.toJSBT();
        const u2 = data.userD.toJSBT();
        expect(res).toEqual({
            ...data,
            userA: u1,
            userB: u1,
            userC: u1,
            userD: u2,
            userE: u2,
        });
        expect(res).not.toBe(data);
    });
});
