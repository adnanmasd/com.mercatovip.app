

<template>

<f7-page>
    <f7-navbar sliding :class="this.$theme.md ? 'color-black' : ''">
        <f7-nav-left>
            <f7-link class="back" icon-only>
                <f7-icon :icon="'fa fa-chevron-' + (this.$f7.rtl ? 'right' : 'left')"></f7-icon>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>
            {{$t('track.title')}}
        </f7-nav-title>
        <f7-nav-right>
          <f7-link icon-only>

          </f7-link>
        </f7-nav-right>
    </f7-navbar>

    <f7-block>
        {{$t('track.details')}}
        <br/>
        <f7-list form id="track">
            <f7-list-item>
                <f7-label>{{$t('track.tracking.title')}}</f7-label>
                <f7-input name="track" type="text" :placeholder="$t('track.tracking.title.placeholder')" v-model="tracking_no" />
            </f7-list-item>
            <br/>
            <f7-button big round bg="green" color="white" class="external" @click="track()">{{$t('track.tracking.button')}}</f7-button>
        </f7-list>
    </f7-block>
</f7-page>

</template>

<script>

export default {
    data() {
            return {
                currentLanguageId: (localStorage.getItem('language_id')),
                currentLanguage: (localStorage.getItem('language_id') == 1 ? false : true),
                direction: (localStorage.getItem('language_id') == 1 ? "ltr" : "rtl"),
                tracking_no: ""
            }
        },
        methods: {
            track() {
                let self = this;
                self.$f7.preloader.show()
                var popup = ""
                if (this.tracking_no.split('-')[0] == "MDS") {
                    popup = window.open("http://www.ontime360.com/tracking/trackingresults.aspx?accid=GDMSb5J8hqyh0rGfrL5IIqJfDC8bxOkdfA3ARqfcrPiEfZvT%2BboHyQ%3D%3D&tn=" + self.tracking_no, "_blank", "location=yes,toolbar=yes,hidden=yes")
                } else {
                    popup = window.open("https://www.aramex.com/track/shipments/TrackShippingDetails/?ShipmentNumber=" + self.tracking_no, "location=yes,toolbar=yes,hidden=yes")
                }
                popup.addEventListener("loadstop", function() {
                    popup.show();
                    self.$f7.preloader.hide();
                });
            }
        }
}

</script>
